import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Buyer/Button';

function Missing() {
    const navigate  = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button onClick={goBack} type="primary" size={'large'}>Back Home</Button>}
        />
    );
}

export default Missing;
