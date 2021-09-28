import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import UserContext from "../contexts/user";
import IPageProps from "../interfaces/page" ;
import firebase from 'firebase/compat';
import { SignInwithSocialMedia as SocialMediaPopup} from '../modules/auth';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import logging from "../config/logging";
import LoadingComponent from '../components/LoadingComponent';
import CenterPiece from '../components/CenterPiece';
import ErrorText from "../components/ErrorText";
import { Providers } from "../config/firebase";


const LoginPage: React.FunctionComponent<IPageProps> = props => {
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const[error,  setError] = useState<string> ('');
    const userContext = useContext(UserContext);
    const history = useHistory();
    const isLogin = window.location.pathname.includes('login');
    
    const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
        if ( error !== '') setError('');
        setAuthenticating(true);
        SocialMediaPopup(provider)
        .then(async result => {
            logging.info(result);

            let user  = result.user;
            if (user)
            {
                let uid = user.uid;
                let name = user.displayName;
                if(name)
                {
                    try
                    {
                        let fire_token = await user.getIdToken();
                        
                    }
                    catch(errot)
                    {
                        setError('Invalid token')
                        logging.error(error)
                        setAuthenticating(false)
                    }
                }
                else 
                {
                    setError("the indentity provide does\'t have a name");
                    setAuthenticating(false);

                }
            }

            else
            {
                setError("missing the logging credentials")
                setAuthenticating(false)
            }
        })
        .catch(error =>{
            setError(error.message)
            setAuthenticating(error.message)
        })
        


    }
    return (
        <CenterPiece>
            <CardHeader>
                {isLogin ? 'login' : 'signup'}
            </CardHeader>
            <CardBody>
                <ErrorText error = {error} />
                <Button
                    block 
                    diabled = {authenticating}
                    onClick = {() => SignInWithSocialMedia(Providers.google)}
                    style={{
                        backgroundColor: '#ea4335',
                        borderColor: "ea4335"
                    }}
                >
                    <i className="fa-brands fa-google"> </i>
                    Sign {isLogin ? 'in' : 'up'} with Google

                </Button>
                {authenticating && <LoadingComponent card = {false}/>}
            </CardBody>
        </CenterPiece>
    );
       
}

export default LoginPage;