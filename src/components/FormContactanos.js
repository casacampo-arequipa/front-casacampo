export const CreateUpdate = (props) => {
  const {
    htmlFor_00,
    label_00,
    id_00,
    value_00,
    onChange_00,
    className_00,
    msgRequired_00,
    htmlFor_01,
    label_01,
    id_01,
    value_01,
    onChange_01,
    className_01,
    msgRequired_01,
    htmlFor_02,
    label_02,
    id_02,
    value_02,
    onChange_02,
    className_02,
    msgRequired_02,
    htmlFor_03,
    label_03,
    id_03,
    value_03,
    onChange_03,
    className_03,
    msgRequired_03,
    htmlFor_04,
    label_04,
    id_04,
    value_04,
    onChange_04,
    className_04,
    msgRequired_04,
  } = props;

  return (
    <div
      className="sm:m-auto md:mt-4 md:mb-4 md:mr-auto md:ml-auto"
      style={{
        borderRadius: "0.375rem",
        color: "black",
        backgroundColor: "white",
      }}
    >
      <div className="grid gap-4 p-4 lg:max-w-[450px] max-w-[400px] m-auto sm:min-w-72">
        <div className="w-full lg:col-span-6 col-span-12">
          <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="w-full lg:col-span-1">
              <label
                htmlFor={htmlFor_00}
                style={{ display: "block", fontWeight: "500" }}
              >
                {label_00}
              </label>
              <input
                type="text"
                id={id_00}
                value={value_00}
                onChange={onChange_00}
                required
                className={className_00}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                  border: "1px solid #ccc",
                }}
              />
              {msgRequired_00}
            </div>
            <div className="w-full lg:col-span-1">
              <label
                htmlFor={htmlFor_02}
                style={{ display: "block", fontWeight: "500" }}
              >
                {label_02}
              </label>
              <input
                type="text"
                id={id_02}
                value={value_02}
                onChange={onChange_02}
                required
                className={className_02}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
              />
              {msgRequired_02}
            </div>
          </div>
        </div>

        <div className="w-full lg:col-span-6 col-span-12">
          <label
            htmlFor={htmlFor_01}
            style={{ display: "block", fontWeight: "500" }}
          >
            {label_01}
          </label>
          <input
            type="text"
            id={id_01}
            value={value_01}
            onChange={onChange_01}
            required
            className={className_01}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.25rem",
              border: "1px solid #ccc",
            }}
          />
          {msgRequired_01}
        </div>

        <div className="w-full lg:col-span-6 col-span-12">
          <label
            htmlFor={htmlFor_03}
            style={{ display: "block", fontWeight: "500" }}
          >
            {label_03}
          </label>
          <input
            type="text"
            id={id_03}
            value={value_03}
            onChange={onChange_03}
            required
            className={className_03}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.25rem",
              border: "1px solid #ccc",
            }}
          />
          {msgRequired_03}
        </div>

        <div className="w-full lg:col-span-6 col-span-12">
          <label
            htmlFor={htmlFor_04}
            style={{ display: "block", fontWeight: "500" }}
          >
            {label_04}
          </label>
          <textarea
            id={id_04}
            value={value_04}
            onChange={onChange_04}
            required
            className={className_04}
            style={{
              height: "100px",
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.25rem",
              border: "1px solid #ccc",
            }}
          />
          {msgRequired_04}
        </div>
      </div>
    </div>
  );
};
