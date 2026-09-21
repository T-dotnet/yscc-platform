import { useState } from "react";
import { Button, Field, Modal, Notice, ValidatedForm } from "./UI";
import {
  CLINICAL_RECORD_TYPES,
  DIAGNOSIS_STATUSES,
  MEDICATION_CHANGES,
  OUTCOME_STATUSES,
  RISK_LEVELS,
  clinicalRecordType,
} from "../clinicalRecords";
import {
  configuredMeasures,
  outcomeNeedsMissingReason,
} from "../measureGovernance";
import { formatDate, TODAY } from "../model";

const formValues = (event) => Object.fromEntries(new FormData(event.currentTarget));

export default function ClinicalRecordForm({ episode, error, onClose, onSave }) {
  const [recordType, setRecordType] = useState("outcome");
  const [measureKey, setMeasureKey] = useState(configuredMeasures()[0].key);
  const [outcomeStatus, setOutcomeStatus] = useState("");
  const latestDate = episode.end && episode.end < TODAY ? episode.end : TODAY;
  const selectedType = clinicalRecordType(recordType);
  const selectedMeasure = configuredMeasures().find(
    (measure) => measure.key === measureKey,
  );

  return (
    <Modal
      title="Add structured record"
      subtitle={`Care period ${episode.number} · ${formatDate(episode.start)}–${episode.end ? formatDate(episode.end) : "present"}`}
      onClose={onClose}
    >
      <ValidatedForm
        onSubmit={(event) => {
          event.preventDefault();
          onSave({ type: "ADD_CLINICAL_RECORD", ...formValues(event) });
        }}
      >
        <div className="form-body care-event-form">
          <Notice>
            Candidate PMHC-MDS-aligned data structure only. It does not submit
            data, score measures, generate a safety plan or make a clinical decision.
          </Notice>
          <div className="form-grid">
            <Field label="Record type">
              <select
                name="recordType"
                value={recordType}
                onChange={(event) => setRecordType(event.target.value)}
                required
              >
                {CLINICAL_RECORD_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Record date" hint="The date recorded by the source.">
              <input type="date" name="recordDate" defaultValue={latestDate} min={episode.start} max={latestDate} required />
            </Field>
          </div>
          <p className="event-type-description">{selectedType?.description}</p>
          <div className="care-event-fields">
            {recordType === "risk" && <>
              <Field label="Recorded risk status">
                <select name="riskLevel" defaultValue=""><option value="" disabled>Choose status</option>{RISK_LEVELS.map((item) => <option key={item}>{item}</option>)}</select>
              </Field>
              <Field label="Next review date (optional)"><input type="date" name="reviewDate" min={episode.start} /></Field>
            </>}
            {recordType === "diagnosis" && <>
              <Field label="Diagnosis as recorded"><input name="diagnosisName" autoFocus required /></Field>
              <Field label="Diagnosis code (optional)"><input name="diagnosisCode" /></Field>
              <Field label="Diagnosis status"><select name="diagnosisStatus" defaultValue=""><option value="" disabled>Choose status</option>{DIAGNOSIS_STATUSES.map((item) => <option key={item}>{item}</option>)}</select></Field>
            </>}
            {recordType === "medication" && <>
              <Field label="Medication name"><input name="medicationName" autoFocus required /></Field>
              <Field label="Recorded medication change"><select name="medicationChange" defaultValue=""><option value="" disabled>Choose change</option>{MEDICATION_CHANGES.map((item) => <option key={item}>{item}</option>)}</select></Field>
              <Field label="Dose as recorded (optional)"><input name="dose" placeholder="For example, 20 mg daily" /></Field>
            </>}
            {recordType === "outcome" && <>
              <Field label="Governed measure">
                <select name="measureKey" value={measureKey} onChange={(event) => setMeasureKey(event.target.value)}>
                  {configuredMeasures().map((measure) => <option key={measure.key} value={measure.key}>{measure.name} · {measure.version}</option>)}
                </select>
              </Field>
              <div className="measure-record-rules">
                <strong>{selectedMeasure.version}</strong>
                <span>Respondents: {selectedMeasure.respondents.join(" · ")}</span>
                <span>Timing: {selectedMeasure.timings.join(" · ")}</span>
                <span>{selectedMeasure.scoring}</span>
                <span>{selectedMeasure.missingData}</span>
              </div>
              <Field label="Respondent"><select name="measureRespondent" key={selectedMeasure.key} defaultValue=""><option value="" disabled>Choose respondent</option>{selectedMeasure.respondents.map((item) => <option key={item}>{item}</option>)}</select></Field>
              <Field label="Collection occasion"><select name="collectionPoint" key={selectedMeasure.key} defaultValue=""><option value="" disabled>Choose occasion</option>{selectedMeasure.timings.map((item) => <option key={item}>{item}</option>)}</select></Field>
              <Field label="Collection status"><select name="outcomeStatus" value={outcomeStatus} onChange={(event) => setOutcomeStatus(event.target.value)}><option value="" disabled>Choose status</option>{OUTCOME_STATUSES.map((item) => <option key={item}>{item}</option>)}</select></Field>
              <Field label="Recorded value" hint="Required only when complete; scoring is not calculated in this prototype."><input name="measureValue" /></Field>
              {outcomeNeedsMissingReason(outcomeStatus) && <Field label="Missing-data reason"><textarea name="missingDataReason" rows="2" required /></Field>}
            </>}
            <Field label="Source or authority" hint="For example, source clinical record, treating practitioner or completed measure."><input name="source" required /></Field>
            <Field label="Notes (optional)"><textarea name="notes" rows="3" /></Field>
          </div>
        </div>
        <div className="modal-footer">
          {error && <p className="field-error form-save-error" role="alert">{error}</p>}
          <Button type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Add record</Button>
        </div>
      </ValidatedForm>
    </Modal>
  );
}
