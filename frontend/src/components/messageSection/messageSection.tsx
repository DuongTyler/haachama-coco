import React from 'react';
import MessageCard from "./messageCard/messageCard";
import {Message} from "../../models/message";
import {Animation} from "../../models/animation";
import BaseSection, {BaseSectionProps, BaseSectionState} from "../../shared/components/baseSection/baseSection";
import {CardStyleLength} from "../../shared/components/baseCard/baseCard";
import DisplayedLanguage from "../../models/language";

interface MessageSectionProps extends BaseSectionProps<Message> {

}

interface MessageSectionState extends BaseSectionState {

}


export default class MessageSection extends BaseSection<Message> {

    constructor(props: MessageSectionProps) {
        super(props);
    }

    renderCard(object: (Message|Animation), cardStyleNum: number, language: DisplayedLanguage, id: number): JSX.Element {
        return <MessageCard object={object} cardStyleNum={id % CardStyleLength} language={language}/>;
    }
}
