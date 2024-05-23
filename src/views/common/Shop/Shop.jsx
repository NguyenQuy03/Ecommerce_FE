import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Shop = () => {
    const menu = (
        <Menu>
            <Menu.Item key="latest">Latest</Menu.Item>
            <Menu.Item key="popularity">Popularity</Menu.Item>
            <Menu.Item key="bestRating">Best Rating</Menu.Item>
        </Menu>
    );

    return (
        <div className="container-fluid pt-5">
            {/* Shop Information */}
            <div className="shop-info-container d-flex align-items-center">
                <div className="shop-info-thumbnail d-flex justify-content-center align-items-center flex-column rounded p-2">
                    <div className="d-flex justify-content-around align-items-center" style={{ width: '100%' }}>
                        <img style={{ maxWidth: '60px' }} src="https://res.cloudinary.com/dald4jiyw/image/upload/v1697031664/Default_pfp.svg_xkjczv.png" alt="Avatar image" />
                        <p className="shop-info-name" style={{ color: 'var(--white)' }}>0l9ih6qg_t</p>
                    </div>
                    <div className="shop-info-interaction d-flex justify-content-around mt-2">
                        <Button className="shop-info-interaction-follow" type="primary" shape="round"><i className="fas fa-plus mx-2"></i>FOLLOW</Button>
                        <Button className="shop-info-interaction-chat" type="primary" shape="round"><i className="far fa-comments mx-2"></i>CHAT</Button>
                    </div>
                </div>
                <div className="shop-info-detail d-flex">
                    <div>
                        <p className="shop-info-quantity-product">Product: 0</p>
                        <p className="shop-info-quantity-following">Following: 0</p>
                        <p className="shop-info-quantity-performance">Chat Performance: 57%</p>
                    </div>
                    <div style={{ width: '200px' }}></div>
                    <div>
                        <p className="shop-info-quantity-follower">Follower: 0</p>
                        <p className="shop-info-quantity-rating">Rating: 0</p>
                        <p className="shop-info-quantity-joined">Joined: 0</p>
                    </div>
                </div>
            </div>

            <div className="row px-xl-5" style={{ marginTop: '50px' }}>
                {/* Shop Sidebar Start */}
                <div className="col-lg-3 col-md-12">
                    {/* Price Start */}
                    <div className="border-bottom mb-4 pb-4">
                        <h5 className="font-weight-semi-bold mb-4"><i className="fas fa-list mx-3" style={{ fontSize: '16px' }}></i>Category</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Cras justo odio</li>
                            <li className="list-group-item">Dapibus ac facilisis in</li>
                            <li className="list-group-item">Morbi leo risus</li>
                            <li className="list-group-item">Porta ac consectetur ac</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                        </ul>
                    </div>
                    {/* Price End */}
                </div>
                {/* Shop Sidebar End */}

                <div className="col-lg-9 col-md-12">
                    <div className="row pb-3">
                        <div className="col-12 pb-1">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <Dropdown overlay={menu}>
                                    <Button>
                                        Sort by <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Product Cards */}
                        {/* Replace th:each with map function to render product cards */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;