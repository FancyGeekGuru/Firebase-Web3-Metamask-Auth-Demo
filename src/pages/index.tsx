import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Web3 from 'web3';
import metamask_logo from 'assets/img/metamask.png';
import './index.scss';
import { routeNames } from 'routes';
import { firestoreDB } from "../firebase";
import 'firebase/firestore';
import {
    is_loading,
    metamask_connected,
    user_already_registered,
} from '../state/actions/auth';

const Home = () => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     loadWeb3();
    // }, []);

    const loadWeb3 = async () => {
        try {
            if ((window as any).ethereum?.isMetaMask) {
                const accounts = await (window as any).ethereum.request({
                    method: "eth_requestAccounts"
                });
                const account = Web3.utils.toChecksumAddress(accounts[0]);
                dispatch(metamask_connected({ publicAddress: account }));
                checkUserRegistered(account);
            } else {
                toast.warn("You don't have metamask installed, Please install to continue");
            }
        } catch (error) {
            toast.error("Please connect to metamask");
        }
    };

    const checkUserRegistered = (publicAddress) => {
        dispatch(is_loading({ loading: true, error: null }));

        firestoreDB.collection("users").doc(publicAddress).get()
            .then((doc) => {
                if (doc.exists) {
                    dispatch(user_already_registered(doc.data()));
                    navigate(routeNames.dashboard);
                } else {
                    dispatch(is_loading({ loading: false, error: null }));
                    console.log("should go to sign up page");
                    navigate(routeNames.signup);
                }
            })
            .catch(error => {
                dispatch(is_loading({ loading: false, error: error }));
                toast.error("Error while connecting firebase");
            });
    };

    return (
        <>
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
                <button className='wallet-connect-but' onClick={() => loadWeb3()}>
                    <div className='d-flex align-items-center'>
                        <img src={metamask_logo} alt="metamask" />
                        <span style={{ paddingLeft: '20px' }}>
                            Connect to Metamask
                        </span>
                    </div>
                </button>
            </div>
        </>
    );
};

export default Home;