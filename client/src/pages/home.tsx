import React from "react";
import { Container } from "reactstrap";
import Navigation from "../components";
import Header from "../components/Header";
import IPageProps from "../interfaces/page" ;

const HomePage: React.FunctionComponent<IPageProps> = props => {
    return (
        <Container fluid className = "p-0">
            <Navigation/>
            <Header
                title="Coolest Blog Website"
                headline = "Checkout the blog"
            />
            <Container className = "mt-5">
                View the blog here
            </Container>

        </Container>
    );
       
}

export default HomePage;