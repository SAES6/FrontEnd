import {FormControl, Grid, Button} from "@mui/material";
import {useState, useRef} from "react";

const ChoicesImage = ({deleteHandler, updateChoiceImage}) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')) {
            const fileUrl = URL.createObjectURL(file);
            setImagePreviewUrl(fileUrl);

            const fileInfo = {
                file,
                fileName: file.name,
                fileType: file.type,
                fileUrl
            };

            updateChoiceImage(fileInfo);
        } else {
            alert('Seulement les images sont autorisées.');
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <Grid item xs={6} sx={{pl: 2, pr: 2, pb: 4}}>
            <FormControl
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '250px',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${imagePreviewUrl})`,
                    border: '1px dashed grey',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{display: 'none'}}
                />
                <Button
                    variant='outlined'
                    onClick={handleButtonClick}
                    sx={{mt: 3}}
                >
                    Ajouter une image
                </Button>
                <Button
                    variant='outlined'
                    onClick={deleteHandler}
                    sx={{mt: 3}}
                >
                    Supprimer
                </Button>
            </FormControl>
        </Grid>
    );
}

export default ChoicesImage;
