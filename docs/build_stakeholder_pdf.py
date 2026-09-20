from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "YSCC-stakeholder-discussion-questions-2026-09-17.pdf"

GREEN = colors.HexColor("#0F5B55")
INK = colors.HexColor("#24343B")
MUTED = colors.HexColor("#5C7078")
LINE = colors.HexColor("#D8E2E0")


def p(text, style):
    return Paragraph(text, style)


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT), pagesize=A4, leftMargin=20 * mm, rightMargin=20 * mm,
        topMargin=18 * mm, bottomMargin=18 * mm,
        title="YSCC stakeholder discussion questions",
        author="YSCC product and UX working documentation",
    )
    styles = getSampleStyleSheet()
    title = ParagraphStyle("title", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=22, leading=26, textColor=GREEN, alignment=TA_LEFT, spaceAfter=5 * mm)
    meta = ParagraphStyle("meta", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.5, leading=13, textColor=MUTED, spaceAfter=7 * mm)
    heading = ParagraphStyle("heading", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=14, leading=18, textColor=GREEN, spaceBefore=5 * mm, spaceAfter=2.5 * mm)
    body = ParagraphStyle("body", parent=styles["BodyText"], fontName="Helvetica", fontSize=10.2, leading=14.5, textColor=INK, spaceAfter=2.5 * mm)
    question = ParagraphStyle("question", parent=body, leftIndent=5 * mm, firstLineIndent=-5 * mm, spaceAfter=2.2 * mm)
    caveat = ParagraphStyle("caveat", parent=body, backColor=colors.HexColor("#F6F9F8"), borderColor=LINE, borderWidth=0.6, borderPadding=8, spaceBefore=4 * mm, spaceAfter=4 * mm)

    story = [
        p("YSCC stakeholder discussion questions", title),
        p("Version 0.2 · 19 September 2026 · Early direction-setting discussion", meta),
        p("Why we are asking", heading),
        p("We are shaping a service that helps care teams collect information, understand what has been recorded over time and decide what to do next. This discussion is about the work and decisions the service should support. It is not a review of screens or navigation.", body),
        p("Assumptions behind the current direction", heading),
        p("The current prototype provides a fictional, selected-episode care timeline. It can place dated care periods, medication courses, events, goal milestones, risk-related events and complete compatible K10 raw totals in time context. The Jordan Ellis fixture also contains visual experiments for design review. None of these examples establishes a clinical policy, governed data model or production feature.", body),
        p("Key terms", heading),
    ]
    terms = [
        [p("Term", body), p("Working definition", body)],
        [p("Care episode", body), p("The period in which a person receives support from a service.", body)],
        [p("Collection point", body), p("A planned baseline or follow-up occasion when information is requested.", body)],
        [p("Event", body), p("A separately recorded change during a care period. Its timing does not prove an outcome or cause.", body)],
        [p("Report", body), p("A role-appropriate view of dated evidence for one selected episode.", body)],
        [p("History", body), p("The record of activity and changes, including who acted, when and what changed.", body)],
    ]
    table = Table(terms, colWidths=[42 * mm, 128 * mm], repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), GREEN), ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("BACKGROUND", (0, 2), (-1, -1), colors.HexColor("#F7FAF9")),
    ]))
    story.extend([table, Spacer(1, 2 * mm)])

    sections = [
        ("Care episode", [
            "What should define the beginning and end of a person’s period of care?",
            "What information must care teams always know about that period, such as dates, owner, status or next step?",
            "How should a new period of care be handled when someone returns, transfers or is referred again?",
        ]),
        ("Events", [
            "Which changes or circumstances are important enough to record during a person’s care?",
            "What should each event include: date, source, details, impact, confidence or something else?",
            "Who should be able to record, correct and see events, and should people or supporters see any of them?",
        ]),
        ("Report", [
            "What should appear first: the latest response, change over time, unanswered work, written comments or next actions?",
            "Which record types are useful on the selected-episode care timeline, and which must remain out until their source, permissions and definitions are approved?",
            "When a timeline shows a care period, medication course, event, goal or K10 raw value, what detail and provenance must be available before staff can use it safely?",
            "What must prevent timeline proximity, a raw value or a visual trend from being read as causality, severity, diagnosis, treatment effect or a clinical recommendation?",
            "Which information belongs in Report, and which should remain in Assessment or History?",
        ]),
        ("Priorities and safeguards", [
            "What must be included in the first release, and what can wait?",
            "What information is too sensitive to show broadly, and what permissions or approvals are needed?",
            "Which visualisations should remain design experiments until their data model, clinical meaning and access rules are agreed?",
            "What evidence would give you confidence that the service is understandable, safe and useful?",
        ]),
    ]
    for section, questions in sections:
        block = [p(section, heading)]
        block.extend(p(f"{index}. {item}", question) for index, item in enumerate(questions, 1))
        story.append(KeepTogether(block))
    story.append(p("These questions are for early alignment. They do not establish clinical policy, access rules, final terminology, scoring rules or release readiness.", caveat))
    doc.build(story)


if __name__ == "__main__":
    main()
