import React from "react";

const UploadFile = ({ name, error, onChange }) => {
  return (
    <div className="col-lg-8 form-group">
      <label class="form-label w-100">File input</label>
      <input type="file" name={name} onChange={onChange} single />
      {/* <small class="form-text text-muted">
        Example block-level help text here.
      </small> */}
      {error && (
        <div className="is-invalid">
          <b>{error}</b>{" "}
        </div>
      )}
    </div>
  );
};

export default UploadFile;
