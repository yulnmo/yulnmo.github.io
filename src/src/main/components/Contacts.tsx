import React, { MouseEvent, useEffect, useState } from 'react';

type ContactsProps = {
    contacts: Array<Array<Contact>>,
    setContactsVisible: (_: boolean) => void,
    contactsVisible: boolean
}

export type Contact = {
    role: string,
    name: string,
    number: string
}

const Contacts = ({contacts, setContactsVisible, contactsVisible}: ContactsProps) => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setContactsVisible(visible);
    }, [visible]);

    useEffect(() => {
        setVisible(contactsVisible);
    }, [contactsVisible]);

    function handleClick(e: MouseEvent<HTMLDivElement>) {
        setVisible(!visible);
    }

    return <div className={`contacts` + (visible ? ' visible' : '')}>
        <div className="title" onClick={handleClick}>
            <div className="icon">
                <i className="fi fi-sr-phone-flip"></i>
            </div>
            <span>연락하기</span>
            <div className="arrows">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`arrow` + (visible ? ' rotate' : '')}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
        <div className="groups">
            {contacts.map((group, index) => {
                return <div key={index} className={`group` + (visible ? ' visible' : '')}>
                    {
                        group.map((contact, index2) => {
                            return <div key={index2} className={`item` + (visible ? ' visible' : '')}>
                                <div className="row">
                                    <div className="col left">
                                        <span className="role">{contact.role}</span>
                                    </div>
                                    <div className="col middle">
                                        <span className="name">{contact.name}</span>
                                    </div>
                                    <div className="col right">
                                        <span className="phone">
                                            <a href={`tel:${contact.number.replace(/\-/g, '')}`} onClick={(e) => {e.stopPropagation();}}>
                                                <i className="fi fi-sr-phone-call"/>
                                            </a>
                                        </span>
                                        <span className="sms">
                                            <a href={`sms:${contact.number.replace(/\-/g, '')}`} onClick={(e) => {e.stopPropagation();}}>
                                                <i className="fi fi-sr-envelope"/>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>;
                        })
                    }
                </div>;
            }).reduce(
                (a, b) => {
                    return <>
                        {a}
                        <div className={`seperator` + (visible ? ' visible' : '')} />
                        {b}
                    </>;
                }
            )}
        </div>
    </div>;
};

export default Contacts;
