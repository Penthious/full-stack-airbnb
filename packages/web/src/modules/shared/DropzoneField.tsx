import * as React from "react";
import Dropzone from "react-dropzone";
import { FieldProps } from "formik";

export const DropzoneField: React.SFC<FieldProps<any>> = ({
  field: { name },
  form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
}) => {
  let preview: string;
  const onDrop = ([file]: any) => {
    setFieldValue(name, file);
    preview = URL.createObjectURL(file);
    console.log(preview);
  };

  return (
    // <Dropzone multiple={false} accept="image/*" onDrop={onDrop} children={} />
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps, isDragActive }) => {
        return (
          <div
            {...getRootProps()}
            className={"dropzone"}
            style={{ display: "flex" }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop files here...</p>
            ) : (
              <p style={{ alignSelf: "center" }}>Click to upload image</p>
            )}
            {preview ? (
              <img src={preview} style={{ height: "100px", width: "100px" }} />
            ) : null}
          </div>
        );
      }}
    </Dropzone>
  );
};
