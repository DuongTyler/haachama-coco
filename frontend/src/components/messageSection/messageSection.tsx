import React from 'react';
import MessageCard from "./messageCard/messageCard";
import {Message} from "../../models/message";
import {Animation} from "../../models/animation";
import {Content} from "../../models/content";
import BaseSection, {BaseSectionProps, BaseSectionState} from "../../shared/components/baseSection/baseSection";
import {CardStyleLength} from "../../shared/components/baseCard/baseCard";
import DisplayedLanguage from "../../models/language";

interface MessageSectionProps extends BaseSectionProps<Content> {

}

interface MessageSectionState extends BaseSectionState {

}


export default class MessageSection extends BaseSection<Content> {

    constructor(props: MessageSectionProps) {
        super(props);
    }

    renderCard(object: Content, cardStyleNum: number, language: DisplayedLanguage, id: number): JSX.Element {
        return <MessageCard object={object} cardStyleNum={id % CardStyleLength} language={language}/>;
    }
}
