
const GenderCheckBox = ({ onCheckBoxChange, selectedGender }) => {
    return (
        <div className="flex">
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer ${selectedGender === "Male" ? "selected" : ""}`}>
                    <span className="label-text">
                        Male
                    </span>
                    <input
                        type="checkbox"
                        className="checkbox border-slate-900"
                        checked={selectedGender === "Male"}
                        onChange={() => { onCheckBoxChange("Male") }}
                    ></input>
                </label>
            </div>
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer ${selectedGender === "Female" ? "selected" : ""}`}>
                    <span className="label-text">
                        Female
                    </span>
                    <input
                        type="checkbox"
                        className="checkbox border-slate-900"
                        checked={selectedGender === "Female"}
                        onChange={() => { onCheckBoxChange("Female") }}
                    ></input>
                </label>
            </div>
        </div>
    )
}

export default GenderCheckBox