import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CheckCircle2, X } from "lucide-react";
import { useStore } from "./store";
import Shell from "./components/Shell";
import Forms from "./components/Forms";
import Worklist from "./features/Worklist";
import People from "./features/People";
import Person from "./features/Person";
import { Quality, Administration, Help } from "./features/Operations";
import Questionnaire from "./features/Questionnaire";
import { Empty, Button } from "./components/UI";
export default function App() {
  const path = usePathname(),
    router = useRouter(),
    { state, storageError } = useStore();
  const [modal, setModal] = useState(null),
    [toast, setToast] = useState("");
  const [session, setSession] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("yscc-session"));
    } catch {
      return null;
    }
  });
  const navigate = (href, options) => {
    router.push(href, options);
  };
  useEffect(() => {
    setModal(null);
  }, [path]);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 4500);
    return () => clearTimeout(id);
  }, [toast]);
  const startQuestionnaire = (context) => {
    const value = { ...context, id: crypto.randomUUID() };
    setSession(value);
    try {
      sessionStorage.setItem("yscc-session", JSON.stringify(value));
    } catch {}
    navigate("/questionnaire");
  };
  const finishSession = () => {
    try {
      sessionStorage.removeItem("yscc-session");
    } catch {}
  };
  if (path === "/preview" || path === "/questionnaire")
    return (
      <Questionnaire
        key={path}
        session={path === "/preview" ? null : session || { unavailable: true }}
        navigate={navigate}
        onEnd={finishSession}
      />
    );
  const shared = { navigate, openModal: setModal };
  let page =
    path === "/" ? (
      <Worklist {...shared} />
    ) : path === "/people" ? (
      <People {...shared} />
    ) : path.startsWith("/people/") ? (
      <Person key={path} id={path.split("/")[2]} {...shared} />
    ) : path === "/quality" ? (
      <Quality {...shared} />
    ) : path === "/administration" ? (
      <Administration {...shared} />
    ) : path === "/help" ? (
      <Help {...shared} />
    ) : (
      <Empty title="This view is unavailable">
        <Button onClick={() => navigate("/")}>Go to My work</Button>
      </Empty>
    );
  return (
    <>
      <Shell
        path={path}
        {...shared}
        qualityCount={state.issues.filter((i) => i.status === "Open").length}
        storageError={storageError}
      >
        {page}
      </Shell>
      {modal && (
        <Forms
          key={JSON.stringify(modal)}
          modal={modal}
          openModal={setModal}
          onClose={() =>
            setModal(
              modal.returnToCollection ||
                modal.returnToReview ||
                modal.returnToDetails
                ? {
                    type: modal.returnToCollection
                      ? "collection"
                      : modal.returnToReview
                        ? "review"
                        : "collection-details",
                    reviewDraft: modal.reviewDraft,
                    collectionDraft: modal.collectionDraft,
                    personId: modal.personId,
                    episodeId: modal.episodeId,
                    collectionId: modal.collectionId,
                  }
                : null,
            )
          }
          navigate={navigate}
          startQuestionnaire={startQuestionnaire}
          notify={setToast}
        />
      )}
      <div className="toast-region" role="status" aria-live="polite">
        {toast && (
          <div className="toast">
            <CheckCircle2 size={20} />
            <span>{toast}</span>
            <button aria-label="Dismiss message" onClick={() => setToast("")}>
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
