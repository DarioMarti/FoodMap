export const handleFotoChange = (e, setFotoPreview) => {
    const file = e.target.files[0];
    if (file) {
        setFotoPreview(URL.createObjectURL(file));
    }
};
