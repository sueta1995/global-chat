import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';
import { Panel, PanelHeader, FixedLayout, Div, Separator, PanelHeaderButton, Input, PanelHeaderSimple, FormLayout, Cell, Root, PanelHeaderBack, Avatar, Group, InfoRow, Header, Link } from '@vkontakte/vkui';

import Icon28InfoOutline from '@vkontakte/icons/dist/28/info_outline';
import Icon28Send from '@vkontakte/icons/dist/28/send';

var user_name;
var user_photo_url;
var user_msg;
var user_url;
let msg_history = [];

bridge
	.send("VKWebAppGetUserInfo")
	.then(data => {
		user_name = data.first_name;
		user_photo_url = data.photo_100;
		user_url = "https://vk.com/id" + data.id;
	});

if (user_name = 'undefined') {
	user_name = "Unauthorized User";
	user_photo_url = "https://vk.com/images/camera_100.png";
	user_url = "#"
}

class App extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			activeView: 'view1',
			value: '',
			date: new Date()
		}

		this.sendMSG = this.sendMSG.bind(this);
		this.handleChange = this.handleChange.bind(this);

	}

	sendMSG() {
		user_msg = this.state.value;
		this.setState({value: ''});
		this.setState({date: new Date()});
		msg_history.push(<Cell multiline before={<Link href={user_url}><Avatar src={user_photo_url}></Avatar></Link>}><Div><Link href={user_url}>{user_name}</Link> в {this.state.date.getHours()}:{this.state.date.getMinutes()}<br></br>{user_msg}</Div></Cell>);
	}
	
	handleChange(event) {
		this.setState({value: event.target.value});
	}

	render() {
		return (
			<Root activeView={this.state.activeView} id="root1">
				<View id="view1" activePanel="panel1" header={false}>
					<Panel id="panel1">
						<PanelHeaderSimple
							left={<PanelHeaderButton onClick={() => this.setState({ activeView: 'view2' }) }><Icon28InfoOutline/></PanelHeaderButton>}
						>
							Глобальный чат
						</PanelHeaderSimple>
						<Div style={{ paddingTop: 10, paddingBottom: 10, whiteSpace: 'pre-line' }}>
							<Group>
								{msg_history}
							</Group>
						</Div>
						<FixedLayout vertical="bottom">
							<Separator wide />
							<Cell asideContent={<Icon28Send onClick={this.sendMSG}></Icon28Send>}><FormLayout ><Input value={this.state.value} onChange={this.handleChange} type="text" placeholder="Ваше сообщение"></Input></FormLayout></Cell>
						</FixedLayout>
					</Panel>
				</View>
				<View id="view2" activePanel="panel2">
					<Panel id="panel2">
						<PanelHeader left={<PanelHeaderBack onClick={() => this.setState({ activeView: 'view1' }) }></PanelHeaderBack>}>
							Информация
						</PanelHeader>
						<Group>
							<Cell>
								<InfoRow header="Автор">
									Tagir Kitaev. All rights reserved. 2020
								</InfoRow>
								<br></br>
								<InfoRow header="Версия">
									beta ver0.1
								</InfoRow>
								<br></br>
								<InfoRow header="Уникальных пользователей">
									1
								</InfoRow>
							</Cell>
						</Group>
						<Group>
							<Header mode="secondary">Использование приложения</Header>
							<Cell multiline>
								<InfoRow header="Контент сообщений">

								</InfoRow>
								<InfoRow header="Авторское право">

								</InfoRow>
								<InfoRow header="Что запрещено делать">

								</InfoRow>
								<InfoRow header="Последствия нарушений">

								</InfoRow>
							</Cell>
						</Group>
						<Group>
							<Header mode="secondary">Помощь в разработке</Header>
							<Cell multiline>
								<InfoRow header="Связь с автором">
									Мой ВК: vk.com/peruntakskazal
								</InfoRow>
								<br></br>
								<InfoRow header="Помочь материально">
									Мой QIWI:
								</InfoRow>
							</Cell>
						</Group>
					</Panel>
				</View>
			</Root>
		)
	}
}

export default App;