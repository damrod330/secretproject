import React from 'react'
import { Grid, Paper } from '@material-ui/core/es';
import NavBar from './components/navBar/NavBar'
import BOF from './components/fragments/Books/BookOfKnowledge'

import LoginForm from './components/LoginForm';


class MainLayout extends React.Component {

    render() {
        return (
            <div className="bg-mask">
                <Grid container spacing={0} alignItems={"flex-start"} justify={"center"}>
                    <Grid item xs={12} md={2} lg={2}>
                        {/*<div className="paper-card">*/}
                            {/*<div className="paper-card-body">*/}
                            {/*Elitr ipsum et et diam sanctus nonumy labore stet dolor, ipsum tempor magna nonumy sadipscing sanctus nonumy et, et diam consetetur no clita et. Eos dolor dolor rebum eirmod dolor et sea rebum aliquyam, no eos labore eirmod aliquyam. Dolor lorem ut sed sea eos erat sed ea. Rebum ipsum.*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        <NavBar/>
                    </Grid>
                    <Grid item xs={12} md={10} lg={9}>
                        <div className="paper-card">
                            <div className="paper-card-body">
                                <BOF/>
                            {/*Sea sea ipsum et et ipsum invidunt clita, clita amet stet at no diam at sed. Consetetur no rebum et ipsum duo ea et sadipscing accusam, duo ut justo eirmod amet eos, amet dolor dolore no elitr sea ipsum diam sea sed, labore duo tempor magna amet et magna et labore at, ipsum et et nonumy clita labore lorem sadipscing et, dolores ut sadipscing stet et ipsum takimata sea accusam invidunt, kasd sadipscing voluptua amet at eirmod sed erat. Magna sit sea et gubergren sit duo sed. Lorem et erat at aliquyam dolor eirmod dolor dolor, at diam aliquyam sed ea rebum erat tempor. Dolores diam amet dolor ipsum at sed, dolor sea invidunt sit sanctus amet est lorem, ipsum amet aliquyam stet sed ipsum ea. Aliquyam no stet sea sed kasd invidunt ea vero ut. Aliquyam sanctus clita accusam ipsum clita sea magna, at stet et eos ut eirmod ea diam. Sadipscing eirmod rebum lorem et est diam et sit aliquyam. Tempor est ut nonumy eos dolores clita ipsum dolor voluptua, rebum dolor no sanctus ut gubergren clita sanctus. Sed eirmod sed accusam dolore. Consetetur diam duo labore sit amet. Elitr ea rebum sea sit eos gubergren. Erat sadipscing et ea takimata lorem amet, ipsum ipsum justo gubergren ipsum justo sadipscing, sanctus ea diam tempor erat et takimata gubergren. Rebum lorem sed justo lorem, diam sit erat at ut accusam labore diam lorem no, ipsum ipsum dolores rebum at et accusam. Labore accusam lorem gubergren et diam lorem sit dolores, sed sanctus magna duo amet lorem consetetur, dolores ea nonumy tempor lorem et duo consetetur erat, sit sit gubergren sadipscing duo at elitr dolores, justo dolore dolores clita est stet erat. Sed kasd est sed ipsum. Nonumy aliquyam et sit ut magna et sanctus amet. Sit est sanctus ut diam magna. Consetetur sea diam tempor amet diam sea et clita. No ipsum sit sit at nonumy eirmod voluptua voluptua gubergren, dolore nonumy sit no vero sit labore ipsum. Invidunt et aliquyam dolor eirmod voluptua ipsum elitr. Gubergren voluptua sit diam kasd sea clita dolores sit, at sed amet sanctus at takimata ut sit sanctus. Ut sanctus ut et kasd, ipsum justo sed dolor magna invidunt sanctus. At gubergren duo eirmod eirmod eirmod justo. Nonumy ipsum invidunt et stet ea accusam, sed magna dolor aliquyam sed stet dolores diam, sadipscing nonumy est kasd sanctus ut diam. Justo duo gubergren erat sadipscing amet, accusam stet sea voluptua et sed consetetur, et consetetur tempor ut accusam. Labore duo elitr diam aliquyam vero. Gubergren sit diam aliquyam ut est dolor voluptua, sed dolore accusam justo eirmod et. Clita amet diam dolores justo vero. Invidunt tempor lorem kasd dolor duo et nonumy dolore, invidunt elitr eirmod et takimata, ea diam consetetur accusam ipsum accusam ipsum no, accusam sit et kasd takimata ipsum aliquyam lorem. Gubergren accusam sed vero tempor eos eos dolor amet, amet dolor sit sit diam sed, et kasd erat tempor lorem aliquyam accusam sed ipsum, est ipsum amet eirmod lorem invidunt.*/}
                            </div>

                        </div>

                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default MainLayout