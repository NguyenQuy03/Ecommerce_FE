
import { message } from 'antd';

const useImageFileTypeValidation = () => {
    const validateImageFileType = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must be smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    return validateImageFileType;
};

export default useImageFileTypeValidation;
