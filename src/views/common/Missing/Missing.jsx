import { Result } from 'antd';
import Button from '~/components/Buyer/Button';

function Missing() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button to={"/"} type="primary">Back Home</Button>}
        />
    );
}

export default Missing;
