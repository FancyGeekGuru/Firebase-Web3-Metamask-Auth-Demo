import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import brodcast_img from 'assets/img/broadcast.png';
import { routeNames } from 'routes';
import { RootState } from 'state/store';
import { storage } from "../../firebase";
import './index.scss';

const Dashboard = () => {
    const navigate = useNavigate();

    const { userInfo, publicAddress } = useSelector(
        (state: RootState) => ({
            userInfo: state.auth.userInfo,
            publicAddress: state.auth.publicAddress,
            loading: state.auth.loading
        })
    );

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        storage.ref('images').child(publicAddress).getDownloadURL()
            .then(url => {
                setImageUrl(url);
            })
            .catch(error => {
                console.log(error);
                toast.error("Can't access to firebase :(");
            });
    }, []);

    const createLFSession = () => {
        navigate(routeNames.createsession);
    };

    return (
        <>
            <div className='top-nav' style={{ height: '200px' }} />
            <div className='container' style={{ marginTop: '80px' }}>
                <Row>
                    <Col lg={4}>
                        <div className='user-card'>
                            <div>
                                <img src={imageUrl} alt={'publicImage'} width={'100%'} style={{ borderRadius: '5px' }} />
                            </div>
                            <span style={{ fontSize: '15px' }}>{userInfo.name}</span>
                            <span style={{ fontSize: '12px' }}>{userInfo.description} </span>
                            <span className='mt-2' style={{ fontSize: '12px', color: 'gray' }}>{publicAddress}</span>
                        </div>
                    </Col>
                    <Col lg={8}>
                        <div className='d-flex justify-content-center align-items-center flex-column' style={{ height: '100%' }}>
                            <p>YOUR GATEWAY TO THE MASSES</p>
                            <div className='d-flex justify-content-center mt-3'>
                                <img src={brodcast_img} alt='brodcast icon' width={'200px'} />
                            </div>
                            <button className='create-but mt-5' onClick={createLFSession}> Create LF Session </button>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Dashboard;