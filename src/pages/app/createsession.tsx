import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import brodcast_img from 'assets/img/broadcast.png';
import { routeNames } from 'routes';
import { RootState } from 'state/store';
import { firestoreDB } from "../../firebase";

const CreateSession = () => {
    const navigate = useNavigate();
    const [session_name, setSessionName] = useState<string>('');
    const [session_description, setSessionDescription] = useState<string>('');

    const { publicAddress } = useSelector(
        (state: RootState) => (
            {
                publicAddress: state.auth.publicAddress,
            }
        )
    );

    const create_session = () => {
        if (session_name === '' || session_description === '') {
            toast.warn("plz kindly input fields correctly. :)");
            return;
        }

        const body = {
            session_creator: publicAddress,
            session_name: session_name,
            session_description: session_description
        };

        firestoreDB.collection("sessions").doc().set(body)
            .then(() => {
                navigate(routeNames.dashboard);
            })
            .catch(err => {
                toast.error(err);
            });
    };

    return (
        <>
            <div className='top-nav' style={{ height: '200px' }} />
            <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
                <div>
                    <div className='d-flex justify-content-center'>
                        <img src={brodcast_img} alt='brodcast icon' width={'100px'} />
                    </div>
                    <div className='mt-4'>
                        <p>Session Name</p>
                        <input className='w-100' value={session_name} onChange={(e) => { setSessionName(e.target.value); }} />
                    </div>
                    <div className='mt-4'>
                        <p>Session description i.e: what is it about, location, accasion, etc</p>
                        <input className='w-100' value={session_description} onChange={(e) => { setSessionDescription(e.target.value); }} />
                    </div>
                    <div className='mt-4'>
                        <p>GatePass Fees</p>
                        <input type="number" className='w-100' />
                    </div>
                    <div className='mt-4 d-flex justify-content-center'>
                        <button className='create-but' onClick={create_session}>{"CREATE ->"}</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateSession;