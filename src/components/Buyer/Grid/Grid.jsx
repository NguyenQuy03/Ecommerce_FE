import { Col, Row } from 'antd';
import { cloneElement } from 'react';

import PropTypes from 'prop-types';

function Grid({ items = [], element }) {
    const renderItems = () => {
        return items.map((item, index) => (
            <Col sm={12} md={6} lg={4} key={item?.id || index}>
                {cloneElement(element, { data: item })}
            </Col>
        ));
    };

    return <Row gutter={[0, 10]}>{renderItems()}</Row>;
}

Grid.propTypes = {
    items: PropTypes.array,
    element: PropTypes.element.isRequired,
};

export default Grid;
