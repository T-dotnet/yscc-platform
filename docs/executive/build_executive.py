#!/usr/bin/env python3
"""Build nine executive PDFs from a single, editable content source.

Uses fixed page plans and measured typography; refuses overflowing layouts.
Detailed Markdown source documents are read for provenance and never modified.
"""
import hashlib
import json
import math
import re
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from pypdf import PdfReader

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
OUT = ROOT / 'output' / 'pdf' / 'executive'
QA = ROOT / 'tmp' / 'pdfs' / 'executive'
FONT_ROOT = Path('/Users/danielenicoletti/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/libreoffice-headless/libreoffice/LibreOfficeDev.app/Contents/Resources/fonts/truetype')
for name, filename in [('Body', 'NotoSans-Regular.ttf'), ('Bold', 'NotoSans-Bold.ttf'), ('Serif', 'NotoSerif-Regular.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(FONT_ROOT / filename)))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='Bold', italic='Body', boldItalic='Bold')

W, H = A4
M = 43
CW = W - M * 2
INK = '#20392F'
MUTED = '#58665F'
CORAL = '#D95034'
SAGE = '#E4EDE6'
TEAL = '#326955'
PAPER = '#FAF9F4'
PEACH = '#FBE8DD'
LINE = '#D6DDD6'
WHITE = '#FFFFFF'
BODY_BOTTOM = 694
DECISION_TOP = 714
DECISION_H = 70
data = json.loads((HERE / 'content.json').read_text())
documents = data['documents']
total_pages = 1 + sum(len(d['pages']) for d in documents)
layout_checks = []


def col(value):
    return colors.HexColor(value)


def clean(value):
    return value.replace('\u2011', '-').replace('\u2013', '-').replace('\u2014', '-').replace('\u00a0', ' ')


def paragraph(text, width, size=10.5, leading=None, font='Body', colour=INK, alignment=TA_LEFT):
    st = ParagraphStyle('p', fontName=font, fontSize=size, leading=leading or size * 1.38,
                        textColor=col(colour), alignment=alignment, spaceBefore=0, spaceAfter=0,
                        splitLongWords=False, allowWidows=0, allowOrphans=0)
    p = Paragraph(escape(clean(text)).replace('\n', '<br/>'), st)
    _, height = p.wrap(width, 2000)
    return p, height


def measure(text, width, **kw):
    return paragraph(text, width, **kw)[1]


class Page:
    def __init__(self, c, name, local_page, local_total, global_page=None):
        self.c = c
        self.name = name
        self.local_page = local_page
        self.local_total = local_total
        self.global_page = global_page

    def rect(self, x, top, width, height, fill, stroke=None, radius=0):
        self.c.setFillColor(col(fill))
        self.c.setStrokeColor(col(stroke or fill))
        self.c.setLineWidth(.65)
        if radius:
            self.c.roundRect(x, H-top-height, width, height, radius, fill=1, stroke=bool(stroke))
        else:
            self.c.rect(x, H-top-height, width, height, fill=1, stroke=bool(stroke))

    def line(self, x1, top1, x2, top2, colour=LINE, width=.8):
        self.c.setStrokeColor(col(colour))
        self.c.setLineWidth(width)
        self.c.line(x1, H-top1, x2, H-top2)

    def text(self, text, x, top, width, size=10.5, leading=None, font='Body', colour=INK):
        p, h = paragraph(text, width, size=size, leading=leading, font=font, colour=colour)
        if top + h > H-8:
            raise ValueError(f'Out of page: {self.name}: {text[:50]}')
        p.drawOn(self.c, x, H-top-h)
        return h

    def label(self, text, x, top, width=CW, colour=TEAL, size=8):
        return self.text(text, x, top, width, size=size, leading=10.5, font='Bold', colour=colour)

    def arrow(self, x1, top1, x2, top2, colour=TEAL):
        self.line(x1, top1, x2, top2, colour, 1)
        a = math.atan2(top2-top1, x2-x1)
        for off in [-.6, .6]:
            self.line(x2, top2, x2-5*math.cos(a+off), top2-5*math.sin(a+off), colour, 1)

    def header(self, d, p):
        self.rect(0, 0, W, H, PAPER)
        self.rect(0, 0, W, 7, INK)
        self.label(f"{d['id']} / {d['title'].upper()}", M, 29, CW-112)
        self.label('EXECUTIVE EDITION', W-M-104, 29, 104, MUTED, 7.5)
        self.line(M, 52, W-M, 52)
        self.label(p['label'], M, 69, CW, CORAL, 8)
        y = 90
        y += self.text(p['title'], M, y, CW, size=29, leading=34, font='Serif')
        y += 9
        y += self.text(p['subtitle'], M, y, CW, size=11.3, leading=16, colour=MUTED)
        return y + 23

    def footer(self, d, p):
        self.rect(M, DECISION_TOP, CW, DECISION_H, INK, radius=5)
        self.label(p['decision']['title'], M+14, DECISION_TOP+11, CW-28, '#B9D7C8', 7.8)
        h = self.text(p['decision']['text'], M+14, DECISION_TOP+26, CW-28,
                      size=9.4, leading=12.5, colour=WHITE)
        if h > DECISION_H-32:
            raise ValueError(f'Decision panel overflow: {d["id"]}/{self.local_page}: {h}')
        self.text(p['basis'], M, 793, CW-64, size=7.1, leading=9.2, colour=MUTED)
        self.label(f'{self.local_page}/{self.local_total}', W-M-32, 795, 32, MUTED, 8)
        self.text(f'YSCC / Working proposal / {data["date"]}', M, 822, CW-85,
                  size=7, leading=8.5, colour=MUTED)
        if self.global_page:
            self.label(f'PACK {self.global_page:02}/{total_pages}', W-M-69, 822, 69, MUTED, 7)
        self.c.showPage()


def block_height(b, width):
    t = b['type']
    if t == 'diagram':
        return b['height']
    if t == 'statement':
        return measure(b['text'], width-28, size=16.5, leading=22, font='Serif')+24
    if t in ('note', 'alert'):
        return 16 + measure(b['title'], width-28, size=10, leading=13, font='Bold') + 5 + measure(b['body'], width-28, size=9.6, leading=13) + 12
    if t in ('path', 'state'):
        n = len(b['items']); w = (width-22*(n-1))/n
        heights=[]
        for it in b['items']:
            h=measure(it['title'],w-20,size=11,leading=14,font='Bold')
            if 'value' in it: h+=7+measure(it['value'],w-20,size=13.2,leading=17,font='Bold')
            h+=8+measure(it['body'],w-20,size=9.5,leading=13)
            heights.append(h+24)
        return max(heights)+10+measure(b['note'],width,size=9.3,leading=13)
    if t == 'cards':
        n=b['columns']; w=(width-14*(n-1))/n; heights=[]
        for i in range(0,len(b['items']),n):
            heights.append(max(27+measure(it['title'],w-28,size=13,leading=17,font='Bold')+7+measure(it['body'],w-28,size=10,leading=14)+14 for it in b['items'][i:i+n]))
        return sum(heights)+12*(len(heights)-1)
    if t == 'rows':
        w1=width*.4-12; w2=width*.6-12
        return 25+sum(max(measure(a,w1,size=9.6,leading=13,font='Bold'),measure(c,w2,size=9.6,leading=13))+17 for a,c in b['rows'])
    if t == 'scope':
        return sum(17+measure(it['title'],width-24,size=12.3,leading=16,font='Bold')+5+measure(it['body'],width-24,size=10,leading=14)+16 for it in b['items'])
    if t == 'value':
        w=(width-16)/2-24
        heights=[]
        for it in b['items']:
            a=measure('JOB / '+it['job'],w,size=9.7,leading=13.5)+7+measure('PAIN / '+it['pain'],w,size=9.7,leading=13.5)
            c=measure('RESPONSE / '+it['response'],w,size=9.7,leading=13.5)+7+measure('GAIN / '+it['gain'],w,size=9.7,leading=13.5)
            heights.append(27+max(a,c)+18)
        return sum(heights)+12*(len(heights)-1)
    if t == 'personas':
        w=width-174
        total=0
        for it in b['items']:
            content=sum(measure(label+' / '+it[key],w,size=9.7,leading=13.5) for label,key in [('NEED','need'),('FRICTION','friction'),('DESIGN','design')])+12
            name=measure(it['name'],140,size=15,leading=19,font='Serif')+7+measure(it['role'],140,size=9,leading=12,font='Bold')+20
            total+=max(content,name)+24
        return total+10*(len(b['items'])-1)
    if t == 'journey':
        return sum(max(17+measure(it[2],width-46,size=9.8,leading=13),31)+8 for it in b['items'])
    if t == 'lanes':
        w=(width-18)/2-24
        heights=[]
        for lane in b['items']:
            h=measure(lane['title'],w,size=17,leading=21,font='Serif')+8+measure(lane['tag'],w,size=7,leading=10,font='Bold')+17
            for title,body in lane['steps']:
                h+=measure(title,w-24,size=10.5,leading=14,font='Bold')+4+measure(body,w-24,size=9.6,leading=13)+18
            heights.append(h+12)
        return max(heights)
    if t == 'branchflow':
        w1=width*.37-26;w2=width*.63-25
        return 25+sum(max(measure(a,w1,size=11,leading=15,font='Bold'),measure(c,w2,size=10,leading=14))+24 for a,c in b['rows'])
    if t == 'nav':
        w=(width-30)/4
        return max(measure(it['title'],w-18,size=10.7,leading=14,font='Bold')+8+measure(it['body'],w-18,size=9.1,leading=12.5)+24 for it in b['items'])
    if t == 'hierarchy':
        return 65+sum(max(measure(a,150,size=11,leading=14,font='Bold'),measure(c,width-190,size=10,leading=14))+18 for a,c in b['items'])+12
    raise ValueError(t)


def draw_block(p,b,x,y,width):
    t=b['type']; height=block_height(b,width)
    if t=='diagram':
        draw_diagram(p,b,x,y,width)
    elif t=='statement':
        p.rect(x,y,width,height,SAGE,radius=4)
        p.rect(x,y,3,height,TEAL)
        p.text(b['text'],x+14,y+12,width-28,size=16.5,leading=22,font='Serif')
    elif t in ('note','alert'):
        p.rect(x,y,width,height,PEACH if t=='alert' else '#F0F1EB',radius=4)
        z=y+12
        z+=p.text(b['title'],x+14,z,width-28,size=10,leading=13,font='Bold',colour=CORAL if t=='alert' else INK)+5
        p.text(b['body'],x+14,z,width-28,size=9.6,leading=13,colour=MUTED if t=='note' else INK)
    elif t in ('path','state'):
        n=len(b['items']);w=(width-22*(n-1))/n
        noteh=measure(b['note'],width,size=9.3,leading=13);h=height-10-noteh
        for i,it in enumerate(b['items']):
            xx=x+i*(w+22)
            p.rect(xx,y,w,h,SAGE if t=='path' else WHITE,LINE,radius=4)
            z=y+12
            z+=p.text(it['title'],xx+10,z,w-20,size=11,leading=14,font='Bold')
            if 'value' in it:z+=7+p.text(it['value'],xx+10,z+7,w-20,size=13.2,leading=17,font='Bold',colour=CORAL)
            p.text(it['body'],xx+10,z+8,w-20,size=9.5,leading=13)
            if i<n-1:
                if t=='path':p.arrow(xx+w+4,y+h/2,xx+w+18,y+h/2)
                else:p.text('+',xx+w+6,y+h/2-9,14,size=14,font='Bold',colour=TEAL)
        p.text(b['note'],x,y+h+10,width,size=9.3,leading=13,colour=MUTED)
    elif t=='cards':
        n=b['columns'];w=(width-14*(n-1))/n;yy=y
        for start in range(0,len(b['items']),n):
            group=b['items'][start:start+n]
            h=max(27+measure(it['title'],w-28,size=13,leading=17,font='Bold')+7+measure(it['body'],w-28,size=10,leading=14)+14 for it in group)
            for i,it in enumerate(group):
                xx=x+i*(w+14);p.rect(xx,yy,w,h,WHITE,LINE,radius=4)
                p.label(it['tag'],xx+14,yy+11,w-28,TEAL,7.2)
                z=yy+27;z+=p.text(it['title'],xx+14,z,w-28,size=13,leading=17,font='Bold')
                p.text(it['body'],xx+14,z+7,w-28,size=10,leading=14,colour=MUTED)
            yy+=h+12
    elif t=='rows':
        w1=width*.4;w2=width-w1
        p.label(b['headers'][0],x,y,w1-12,size=7.3);p.label(b['headers'][1],x+w1,y,w2-12,size=7.3)
        yy=y+25
        for a,c in b['rows']:
            h=max(measure(a,w1-12,size=9.6,leading=13,font='Bold'),measure(c,w2-12,size=9.6,leading=13))+17
            p.line(x,yy-7,x+width,yy-7)
            p.text(a,x,yy,w1-12,size=9.6,leading=13,font='Bold')
            p.text(c,x+w1,yy,w2-12,size=9.6,leading=13,colour=MUTED)
            yy+=h
    elif t=='scope':
        yy=y
        for i,it in enumerate(b['items']):
            p.rect(x,yy+2,3,25,TEAL if i==0 else CORAL)
            p.label(it['tag'],x+12,yy,width-24,TEAL if i==0 else CORAL,7.3)
            z=yy+17;z+=p.text(it['title'],x+12,z,width-24,size=12.3,leading=16,font='Bold')
            z+=5+p.text(it['body'],x+12,z+5,width-24,size=10,leading=14,colour=MUTED)
            yy=z+16
    elif t=='value':
        w=(width-16)/2;yy=y
        for it in b['items']:
            a=measure('JOB / '+it['job'],w-24,size=9.7,leading=13.5)+7+measure('PAIN / '+it['pain'],w-24,size=9.7,leading=13.5)
            c=measure('RESPONSE / '+it['response'],w-24,size=9.7,leading=13.5)+7+measure('GAIN / '+it['gain'],w-24,size=9.7,leading=13.5)
            h=27+max(a,c)+18
            p.label(it['name'].upper(),x,yy,width,size=8.1)
            p.rect(x,yy+20,w,h-20,WHITE,LINE,radius=4);p.rect(x+w+16,yy+20,w,h-20,SAGE,radius=4)
            z=yy+31;z+=p.text('JOB / '+it['job'],x+12,z,w-24,size=9.7,leading=13.5)
            p.text('PAIN / '+it['pain'],x+12,z+7,w-24,size=9.7,leading=13.5,colour=MUTED)
            z=yy+31;z+=p.text('RESPONSE / '+it['response'],x+w+28,z,w-24,size=9.7,leading=13.5)
            p.text('GAIN / '+it['gain'],x+w+28,z+7,w-24,size=9.7,leading=13.5,colour=TEAL)
            yy+=h+12
    elif t=='personas':
        yy=y;w=width-174
        for it in b['items']:
            content=sum(measure(label+' / '+it[key],w,size=9.7,leading=13.5) for label,key in [('NEED','need'),('FRICTION','friction'),('DESIGN','design')])+12
            name=measure(it['name'],140,size=15,leading=19,font='Serif')+7+measure(it['role'],140,size=9,leading=12,font='Bold')+20
            h=max(content,name)+24
            p.rect(x,yy,width,h,WHITE,LINE,radius=4);p.rect(x,yy,3,h,TEAL)
            p.label(it['id'],x+12,yy+11,140,CORAL,7.5)
            z=yy+28;z+=p.text(it['name'],x+12,z,140,size=15,leading=19,font='Serif')
            p.text(it['role'],x+12,z+7,140,size=9,leading=12,font='Bold',colour=TEAL)
            z=yy+12
            for label,key in [('NEED','need'),('FRICTION','friction'),('DESIGN','design')]:
                z+=p.text(label+' / '+it[key],x+162,z,w,size=9.7,leading=13.5,colour=MUTED if key=='friction' else INK)+6
            yy+=h+10
    elif t=='journey':
        yy=y
        for i,(num,title,body) in enumerate(b['items']):
            h=max(17+measure(body,width-46,size=9.8,leading=13),31)+8
            p.rect(x,yy+1,28,25,SAGE,radius=4);p.label(num,x+6,yy+7,22,TEAL,8)
            if i<len(b['items'])-1:p.line(x+14,yy+28,x+14,yy+h-3,LINE)
            p.text(title,x+42,yy,width-46,size=11.2,leading=15,font='Bold')
            p.text(body,x+42,yy+17,width-46,size=9.8,leading=13,colour=MUTED)
            yy+=h
    elif t=='lanes':
        w=(width-18)/2
        for i,lane in enumerate(b['items']):
            xx=x+i*(w+18);p.rect(xx,y,w,height,WHITE,LINE,radius=4)
            z=y+12;z+=p.text(lane['title'],xx+12,z,w-24,size=17,leading=21,font='Serif')
            z+=8+p.label(lane['tag'],xx+12,z+8,w-24,TEAL,7)
            z+=17
            for j,(title,body) in enumerate(lane['steps']):
                p.label(f'{j+1:02}',xx+12,z+2,22,CORAL,7.5)
                z+=p.text(title,xx+36,z,w-48,size=10.5,leading=14,font='Bold')+4
                z+=p.text(body,xx+36,z,w-48,size=9.6,leading=13,colour=MUTED)+18
    elif t=='branchflow':
        split=width*.37;w1=split-26;w2=width-split-25
        p.label('MAIN PATH',x,y,split,size=7.3);p.label('DECISION OR RECOVERY',x+split+16,y,width-split-16,size=7.3)
        yy=y+25
        for i,(a,c) in enumerate(b['rows']):
            h=max(measure(a,w1,size=11,leading=15,font='Bold'),measure(c,w2,size=10,leading=14))+24
            p.rect(x,yy,split-10,h-8,SAGE,radius=4)
            p.text(a,x+10,yy+9,w1,size=11,leading=15,font='Bold')
            p.arrow(x+split-6,yy+(h-8)/2,x+split+11,yy+(h-8)/2)
            p.text(c,x+split+18,yy+9,w2,size=10,leading=14,colour=MUTED)
            if i<len(b['rows'])-1:p.arrow(x+(split-10)/2,yy+h-7,x+(split-10)/2,yy+h-1)
            yy+=h
    elif t=='nav':
        w=(width-30)/4
        for i,it in enumerate(b['items']):
            xx=x+i*(w+10);p.rect(xx,y,w,height,INK,radius=4)
            z=y+12;z+=p.text(it['title'],xx+9,z,w-18,size=10.7,leading=14,font='Bold',colour=WHITE)
            p.text(it['body'],xx+9,z+8,w-18,size=9.1,leading=12.5,colour='#D6E5DB')
    elif t=='hierarchy':
        p.rect(x,y,width,height,WHITE,LINE,radius=4)
        trail=f"{b['root']}  /  {b['middle']}  /  {b['leaf']}"
        p.label('PERSISTENT CARE CONTEXT',x+14,y+12,width-28,size=7.3)
        p.text(trail,x+14,y+29,width-28,size=12.5,leading=17,font='Bold')
        yy=y+65
        for i,(a,c) in enumerate(b['items']):
            h=max(measure(a,150,size=11,leading=14,font='Bold'),measure(c,width-190,size=10,leading=14))+18
            p.line(x+22,yy+7,x+34,yy+7,TEAL)
            if i<len(b['items'])-1:p.line(x+22,yy+7,x+22,yy+h+7,TEAL)
            p.text(a,x+42,yy,150,size=11,leading=14,font='Bold')
            p.text(c,x+194,yy,width-208,size=10,leading=14,colour=MUTED)
            yy+=h
    return height


def draw_diagram(p, b, x, y, width):
    """Explicit, measured flow geometry. All connector points are top-based."""
    nodes = {n['id']: n for n in b['nodes']}
    assert len(nodes) == len(b['nodes']), 'Duplicate flow node'
    for edge in b['edges']:
        assert edge['from'] in nodes and edge['to'] in nodes
        points = edge['points']
        for px, py in points:
            assert 0 <= px <= width and 0 <= py <= b['height']
        colour = CORAL if edge.get('exception') else TEAL
        for a, z in zip(points[:-2], points[1:-1]):
            p.line(x+a[0], y+a[1], x+z[0], y+z[1], colour, 1.1)
        a, z = points[-2:]
        p.arrow(x+a[0], y+a[1], x+z[0], y+z[1], colour)
    for n in b['nodes']:
        xx, yy, w, h = x+n['x'], y+n['y'], n['w'], n['h']
        assert n['x'] >= 0 and n['x']+w <= width+.1
        assert n['y'] >= 0 and n['y']+h <= b['height']+.1
        kind = n.get('kind','action')
        fill = {'action':WHITE,'decision':SAGE,'pause':PEACH,'outcome':INK}.get(kind, WHITE)
        if kind == 'decision':
            path = p.c.beginPath()
            path.moveTo(xx+w/2,H-yy)
            path.lineTo(xx+w,H-yy-h/2)
            path.lineTo(xx+w/2,H-yy-h)
            path.lineTo(xx,H-yy-h/2)
            path.close()
            p.c.setFillColor(col(fill));p.c.setStrokeColor(col(TEAL));p.c.setLineWidth(.8)
            p.c.drawPath(path,stroke=1,fill=1)
            tw = w*.56
        else:
            p.rect(xx, yy, w, h, fill, CORAL if kind=='pause' else LINE, radius=5)
            tw = w-20
        colour = WHITE if kind=='outcome' else INK
        title, th = paragraph(n['title'],tw,size=n.get('size',10.4),leading=13,font='Bold',colour=colour,alignment=TA_CENTER)
        body, bh = (None,0)
        if n.get('body'):
            body,bh = paragraph(n['body'],tw,size=9.2,leading=12,colour='#D6E5DB' if kind=='outcome' else MUTED,alignment=TA_CENTER)
        gap = 3 if body else 0
        used = th+gap+bh
        if used > h-10 or (kind=='decision' and used > h*.5):
            raise ValueError(f'Flow text overflow {n["id"]}: {used} in {h}')
        ty = yy+(h-used)/2
        title.drawOn(p.c,xx+(w-tw)/2,H-ty-th)
        if body:body.drawOn(p.c,xx+10,H-ty-th-gap-bh)
    for label in b.get('labels',[]):
        text = label['text']; xx=x+label['x']; yy=y+label['y']; w=label['w']
        size=label.get('size',8.8)
        obj,h=paragraph(text,w,size=size,leading=11.5,font='Bold' if label.get('bold',True) else 'Body',colour=CORAL if label.get('exception') else MUTED,alignment=TA_CENTER if label.get('center') else TA_LEFT)
        assert label['y']+h <= b['height']+.1
        if label.get('center'):
            p.rect(xx-2,yy-1,w+4,h+2,PAPER)
        obj.drawOn(p.c,xx,H-yy-h)


def render_page(c,d,p,local,global_page=None):
    obj=Page(c,d['title'],local,len(d['pages']),global_page)
    top=obj.header(d,p)
    heights=[block_height(b,CW) for b in p['blocks']]
    # Fixed type sizes are preserved. Only inter-block white space adapts.
    gap=14
    free=BODY_BOTTOM-top-sum(heights)
    if len(heights)>1:gap=min(17,max(8,free/(len(heights)-1)))
    end=top+sum(heights)+gap*(len(heights)-1)
    layout_checks.append({'brief':d['id'],'page':local,'start':round(top,1),'end':round(end,1),'limit':BODY_BOTTOM,'gap':round(gap,1)})
    if end>BODY_BOTTOM+.1:
        raise ValueError(f'Layout overflow {d["id"]}/{local}: {end:.1f} > {BODY_BOTTOM}; blocks {heights}')
    y=top
    for b in p['blocks']:y+=draw_block(obj,b,M,y,CW)+gap
    obj.footer(d,p)


def cover(c):
    p=Page(c,'Executive pack',1,total_pages,1)
    p.rect(0,0,W,H,INK)
    p.rect(M,39,39,4,'#F37655')
    p.label('YSCC PLATFORM',M,63,CW,WHITE,10)
    p.label('PRODUCT + UX / EXECUTIVE EDITION',M,89,CW,'#B9D7C8',8)
    p.text('Better care.\nClearer evidence.',M,136,CW,size=40,leading=49,font='Serif',colour=WHITE)
    p.text('Eight concise briefs for alignment, investment and delivery decisions.',M,261,CW-35,size=15,leading=22,colour='#D6E5DB')
    p.text('A local prototype demonstrates sample care-collection tasks. This remains a working proposal, not clinical, legal or launch approval.',M,327,CW,size=10.5,leading=15,colour='#C0D4C6')
    p.line(M,397,W-M,397,'#648776')
    p.label('READ THE WHOLE PACK OR OPEN A BRIEF',M,415,CW,'#B9D7C8',8)
    start=2
    for i,d in enumerate(documents):
        row=i//2;column=i%2;x=M+column*(CW/2+9);y=452+row*61;w=CW/2-18
        p.label(d['id'],x,y,28,'#F79172',9)
        p.text(d['title'],x+32,y-2,w-42,size=12.4,leading=16,font='Bold',colour=WHITE)
        p.text(f"Page {start:02}  /  {len(d['pages'])} pages",x+32,y+20,w-42,size=8.4,leading=12,colour='#BCD1C3')
        c.linkRect('',f'brief_{d["id"]}',(x,H-y-42,x+w,H-y+7),relative=0,thickness=0)
        start+=len(d['pages'])
    p.rect(M,720,CW,63,'#304D3E',radius=4)
    p.label('HOW TO READ STATUS',M+13,731,CW-26,'#B9D7C8',7.7)
    p.text('Reported = captured source. Proposed = design baseline. Conditional / candidate = needs scope approval. All personas remain draft hypotheses.',M+13,747,CW-26,size=9.2,leading=12.5,colour=WHITE)
    p.label(f"{data['date'].upper()}  /  {data['version'].upper()}",M,815,CW-80,'#BCD1C3',7.4)
    p.label(f'PACK 01/{total_pages}',W-M-70,815,70,'#BCD1C3',7.4)
    c.showPage()


def make_canvas(path,title):
    c=canvas.Canvas(str(path),pagesize=A4,pageCompression=1)
    c.setTitle(title)
    c.setAuthor('YSCC product and UX working documentation')
    c.setSubject('Executive summary. Proposed design and open decisions; not an approved clinical protocol.')
    return c


def write_text_editions():
    # Generated editable reading copies; content.json is the build source of truth.
    for d in documents:
        lines=[f'# YSCC Platform - {d["title"]}', '', f'{data["version"]} | {data["date"]} | {data["status"]}', '', f'Detailed source: [../{d["source"]}](../{d["source"]})', '']
        for page in d['pages']:
            lines.extend(['## '+page['title'],'',page['subtitle'],''])
            for b in page['blocks']:
                if b['type']=='statement':lines.extend([b['text'],''])
                elif b['type'] in ('note','alert'):lines.extend(['### '+b['title'],'',b['body'],''])
                elif b['type']=='rows':
                    lines.extend(['| '+' | '.join(b['headers'])+' |','| --- | --- |'])
                    lines.extend('| '+' | '.join(row)+' |' for row in b['rows']);lines.append('')
                elif b['type'] in ('journey','branchflow'):
                    for row in b.get('items',b.get('rows',[])):lines.extend(['- '+' - '.join(row),''])
                elif b['type']=='hierarchy':
                    lines.extend([b['root']+' > '+b['middle']+' > '+b['leaf'],''])
                    for a,c in b['items']:lines.extend(['- **'+a+':** '+c,''])
                else:
                    for it in b['items']:
                        title=it.get('name',it.get('title',''))
                        lines.extend(['### '+title,''])
                        for key,value in it.items():
                            if key in ('name','title'):continue
                            if key=='steps':
                                for a,c in value:lines.extend(['- **'+a+':** '+c,''])
                            else:lines.extend([f'**{key.title()}:** {value}',''])
                    if b.get('note'):lines.extend([b['note'],''])
            lines.extend(['### '+page['decision']['title'],'',page['decision']['text'],'','Basis: '+page['basis'],''])
        (HERE/f"{d['id']}-{d['slug']}.md").write_text('\n'.join(lines))


def main():
    OUT.mkdir(parents=True,exist_ok=True);QA.mkdir(parents=True,exist_ok=True)
    hashes={d['source']:hashlib.sha256((ROOT/'docs'/d['source']).read_bytes()).hexdigest() for d in documents}
    files=[]
    for d in documents:
        path=OUT/f"{d['id']}-{d['slug']}-executive.pdf"
        c=make_canvas(path,'YSCC - '+d['title']+' - Executive brief')
        for i,p in enumerate(d['pages'],1):
            c.bookmarkPage(f'page_{i}');c.addOutlineEntry(p['title'],f'page_{i}',0)
            render_page(c,d,p,i)
        c.save();files.append(path)
    pack=OUT/'YSCC-Executive-Pack.pdf'
    c=make_canvas(pack,'YSCC Platform - Product and UX Executive Pack')
    c.bookmarkPage('contents');c.addOutlineEntry('Contents','contents',0)
    cover(c);g=2
    for d in documents:
        c.bookmarkPage(f'brief_{d["id"]}');c.addOutlineEntry(d['id']+' - '+d['title'],f'brief_{d["id"]}',0)
        for i,p in enumerate(d['pages'],1):render_page(c,d,p,i,g);g+=1
    c.save();files.append(pack)
    # Text QA catches omitted pages and unrendered content; visual QA is performed separately.
    checks=[]
    for f in files:
        r=PdfReader(f)
        texts=[p.extract_text() for p in r.pages]
        assert all(len(t)>250 for t in texts),f'Empty page in {f}'
        assert all('\ufffd' not in t and '\u25a0' not in t for t in texts),f'Glyph issue in {f}'
        checks.append({'file':f.name,'pages':len(r.pages),'bytes':f.stat().st_size,'words':sum(len(t.split()) for t in texts)})
    full='\n'.join(p.extract_text() for p in PdfReader(pack).pages)
    for name in ['Jess Tran','Kai','Deb','Rachel Nguyen','Tom Fletcher','Ananya Rao','Dr Sam Okafor','Priya Sharma','David Thompson','Maya Brooks','Dr Helen Marsh']:
        assert name in full,name
    assert len(PdfReader(pack).pages)==total_pages
    assert len(files)==9
    assert 'MVP / Stage 2' in full and '998' in full
    for source,digest in hashes.items():assert hashlib.sha256((ROOT/'docs'/source).read_bytes()).hexdigest()==digest
    manifest={'status':'Text/layout bounds checked; visual review required','files':checks,'source_hashes':hashes,'layout_checks':layout_checks,'total_pack_pages':total_pages}
    (QA/'manifest.json').write_text(json.dumps(manifest,indent=2))
    print(json.dumps({'files':checks,'pack_pages':total_pages,'layout_bounds':'pass','source_files_unchanged':True},indent=2))


if __name__=='__main__':
    main()
