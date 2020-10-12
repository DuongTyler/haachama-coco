import React from "react";
import CSS from 'csstype';
import classNames from 'classnames';
import handleViewport from 'react-in-viewport';
import {Region} from "../../../models/region";
import {Message} from "../../../models/message";
import {Animation} from "../../../models/animation";
import DisplayedLanguage from "../../../models/language";
import {ReactComponent as TranslateBotan} from "../../../assets/icons/translateIcon.svg";
import { Twemoji } from 'react-emoji-render';
import BaseCard, {BaseCardProps, BaseCardState} from "../../../shared/components/baseCard/baseCard";
import { linkToString } from '../../../models/url';

import "./messageCard.css";
import "../../gallery/artworkCard/artworkCard.css";
import '../../../shared/globalStyles/global.css'

interface MessageCardProps extends BaseCardProps<Message>{
}

interface MessageCardState extends BaseCardState{
}

function regionCodeToFlag(code: Region): string {
    // Offset between Latin uppercase A-Z and Regional Indicator Symbols A-Z
    const RI_OFFSET = 0x1F1A5;

    if (code.length !== 2) return "";

    let first = code.charCodeAt(0);
    if (first < 0x41 && first > 0x5A) return "";
    first += RI_OFFSET;

    let second = code.charCodeAt(1);
    if (second < 0x41 && second > 0x5A) return "";
    second += RI_OFFSET;

    return String.fromCodePoint(first, second);
}

export default class MessageCard extends BaseCard<(Message|Animation), MessageCardProps, MessageCardState> {
    private readonly message: (Message|Animation);
    private readonly flag: string;
    private readonly hasTlMsg: boolean;

    constructor(props: MessageCardProps) {
        super(props);
        this.message = props.object;
        this.flag = regionCodeToFlag(props.object.region);
        this.hasTlMsg = this.message.tl_msg.length > 0;
        this.toggleCurrentLanguage = this.toggleCurrentLanguage.bind(this);
    }
    private toggleCurrentLanguage(): void {
        this.setState((state: MessageCardState) => ({
            currentLanguage: state.currentLanguage === DisplayedLanguage.Original
                ? DisplayedLanguage.Japanese
                : DisplayedLanguage.Original
        }));
    }

    componentWillMount() {
        this.setState({
            currentLanguage: this.hasTlMsg ?  this.props.language : DisplayedLanguage.Original,
            globalLanguage: this.props.language
        });
    }

    componentDidUpdate() {
        if (this.state.globalLanguage !== this.props.language) {
            this.setState({
                currentLanguage: this.hasTlMsg ?  this.props.language : DisplayedLanguage.Original,
                globalLanguage: this.props.language
            });
        }
    }

    renderMessage() {
        return (
            <div>
                <div className="message-card-text-container">
                    <div className={classNames("message-card-text", {
                        "active-message": this.state.currentLanguage === DisplayedLanguage.Original,
                    })}>
                        <div>{this.message.orig_msg}</div>
                    </div>
                    {this.hasTlMsg &&
                    <div className={classNames("message-card-text", {
                        "active-message": this.state.currentLanguage === DisplayedLanguage.Japanese,
                    })}>
                        <div>{this.message.tl_msg}</div>
                    </div>
                    }
                    <div className="clear"/>
                </div>
                <div className="message-card-footer">
                    {this.message.username}
                    <Twemoji text={this.flag} />
                </div>
                {this.hasTlMsg &&
                <TranslateBotan className="message-card-translate" onMouseDown={this.toggleCurrentLanguage} />
                }
            </div>
        )
    }

    renderAnimation() {
        return (
            <div>
                <div className="message-card-text-container justify-align-center">
                    <img src={linkToString(this.message.animationLink)} alt={this.message.title} />
                </div>
                <div className="artwork-card-footer">
                    <div className="title">{this.message.title}</div>
                    <div className="artist"><a href={linkToString(this.message.artistLink)}>{this.message.username}</a></div>
                </div>
            </div>
        )
    }

    render() {
        if (this.message.messageID == 9999) {
            return this.renderCard(this.renderAnimation());
        }
        return this.renderCard(this.renderMessage());
    }
}
