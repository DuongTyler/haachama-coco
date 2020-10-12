import React from 'react';
import MessageSection from '../../components/messageSection/messageSection';
import ArchiveSection from '../../components/archiveSection/archiveSection';
import {Message} from "../../models/message";
import {Animation} from "../../models/animation";
import {toRegion} from "../../models/region";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service";
import Spinner from "../../shared/components/spinner/spinner";
import Fade from "../../shared/animation/fade";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import './home.css';
import '../../shared/globalStyles/global.css'

export interface HomePageProps {

}

export interface HomePageState {
    loading: boolean;
    messages: Message[];
    animations: Animation[];
}

export default class HomePage extends React.Component<HomePageProps, HomePageState> {

    constructor(props: HomePageProps,
                private manoAloeService: ManoAloeService) {
        super(props);
        this.manoAloeService = new ManoAloeService();
    }

    state: HomePageState = {
        loading: false,
        messages: [],
        animations: [],
    }

    componentDidMount() {
        this.getData();
    }


    private getData(): void {
        const cachedMessages: Message[] | null = SessionService.getMessages();
        const cachedAnimations: Animation[] | null = SessionService.getAnimations();
        if (cachedMessages && cachedMessages.length) {
            this.setState({messages: cachedMessages});
        } else {
            this.setState({loading: true});
            this.manoAloeService.getAllMessages()
                .then((messages: Message[]) => {
                    for (const message of messages) {
                        message.region = toRegion(message.region as string);
                    }
                    SessionService.saveMessages(messages);
                    this.setState({loading: false, messages});
                })
                .catch((error: Error) => {
                    console.error(error);
                    this.setState({loading: false});
                })
        }
        if (cachedAnimations && cachedAnimations.length) {
            this.setState({animations: cachedAnimations});
        } else {
            this.manoAloeService.getAnimations()
                .then((animations: Animation[]) => {
                    SessionService.saveAnimations(animations);
                    this.setState({loading: false, animations});
                })
                .catch((error: Error) => {
                    console.error(error);
                    this.setState({loading: false});
                })
        }
    }

    renderMessageCardSection() {
        return (
            <div>
                <div className="wrapper-overlay">
                    {this.state.loading ? <div/> : <MessageSection data={this.state.messages}/>}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="home-root">
                <Fade mounted={this.state.loading} childComponent={<Spinner/>}/>
                <ArchiveSection />
                {this.renderMessageCardSection()}
            </div>
        )
    }
}
