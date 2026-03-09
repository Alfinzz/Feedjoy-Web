// Home Page - Public landing page

import { useLayoutEffect } from 'react';
import Navigation from '../../components/commons/Navigation';
import Hero from '../../components/home/Hero';
import Benefits from '../../components/home/Benefits';
import WhyChoose from '../../components/home/WhyChoose';
import HowToUse from '../../components/home/HowToUse';
import SuitableAnimals from '../../components/home/SuitableAnimals';
import CallToAction from '../../components/home/CallToAction';
import Footer from '../../components/commons/Footer';

export default function Home() {
    useLayoutEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navigation />
            <Hero />
            <Benefits />
            <WhyChoose />
            <HowToUse />
            <SuitableAnimals />
            <CallToAction />
            <Footer />
        </>
    );
}
