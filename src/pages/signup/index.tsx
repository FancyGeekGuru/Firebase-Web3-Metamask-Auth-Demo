import React, { useState } from 'react';
import ImageUploader from 'react-image-upload';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-image-upload/dist/index.css';
import { user_already_registered } from 'state/actions/auth';
import { RootState } from 'state/store';
import { storage, firestoreDB } from "../../firebase";
import { routeNames } from '../../routes';
import './index.scss';

const SignUp = () => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    const { publicAddress } = useSelector(
        (state: RootState) => (
            {
                publicAddress: state.auth.publicAddress,
            }
        )
    );

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageFile, setImageFile] = useState(undefined);
    const [loading, setLoadingState] = useState(false);

    function getImageFileObject(file) {
        setImageFile(file);
    }

    function runAfterImageDelete() {
        setImageFile(undefined);
    }

    const submit = () => {
        if (imageFile === undefined || name === '' || description === '') {
            toast.error("Please input field correctly :)");
            return;
        }

        const body = {
            name: name,
            description: description,
        };

        setLoadingState(true);

        storage.ref('images').child(publicAddress).put(imageFile.file, { contentType: imageFile.file.type })
            .then(() => {
                firestoreDB.collection("users").doc(publicAddress).set(body)
                    .then(() => {
                        dispatch(user_already_registered(body));
                        navigate(routeNames.dashboard);
                        setLoadingState(false);
                    })
                    .catch(err => {
                        setLoadingState(false);
                        toast.error(err);
                    });
            })
            .catch(err => {
                setLoadingState(false);
                toast.error(err);
            });
    };

    return (
        <>
            {
                loading && <div>loading ...</div>
            }
            {
                !loading &&
                <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
                    <div className='sign-up-card'>
                        <div>
                            <span className='d-flex justify-content-center' style={{ fontSize: '13px' }}>{publicAddress}</span>
                            <div className='d-flex justify-content-center mt-4'>
                                <ImageUploader
                                    onFileAdded={(img) => getImageFileObject(img)}
                                    onFileRemoved={() => runAfterImageDelete()}
                                />
                            </div>
                            <div className='mt-4'>
                                <input placeholder='plz input name' onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                            <div className='mt-4'>
                                <input placeholder='plz input description' onChange={(e) => setDescription(e.target.value)} value={description} />
                            </div>
                            <div className='d-flex justify-content-center mt-4'>
                                <button className='save-but' onClick={submit}> save </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default SignUp;