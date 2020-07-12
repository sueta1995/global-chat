import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';
import { Panel, PanelHeader, FixedLayout, Div, Separator, PanelHeaderButton, Input, PanelHeaderSimple, FormLayout, Cell, Root, PanelHeaderBack, Avatar, Group, InfoRow, Header, Link, Button, Tabs } from '@vkontakte/vkui';

import Icon28InfoOutline from '@vkontakte/icons/dist/28/info_outline';
import Icon28Send from '@vkontakte/icons/dist/28/send';

var user_name;
var user_photo_url;
var user_msg;
var user_url;
let msg_history = [];
var user_id;

bridge
	.send("VKWebAppGetUserInfo")
	.then(data => {
		user_name = data.first_name;
		user_photo_url = data.photo_100;
		user_url = "https://vk.com/id" + data.id;
		user_id = data.id;
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

		if (user_msg != "" && user_msg.split(' ').length-1 != user_msg.length) {
			this.setState({date: new Date()});

			if (document.getElementsByClassName("msg").length >= 5) {
				msg_history.splice(0, 1);
			}

			const url = "http://a0453728.xsph.ru/postMsgContent.php?user_id=" + user_id + "&user_photo_url=" + user_photo_url  + "&user_msg=" + user_msg + "&msg_date=" + this.state.date.toLocaleTimeString();
			const Http = new XMLHttpRequest();
			Http.open('POST', url);
			Http.send();

			msg_history.push(<Cell className="msg" multiline before={<Link href={user_url}><Avatar src={user_photo_url}></Avatar></Link>}><Div><Link href={user_url}>{user_name}</Link> в {this.state.date.toLocaleTimeString()}<br></br>{user_msg}</Div></Cell>);
			this.setState({value: ''});
		}
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
						<Div style={{ whiteSpace: 'pre-line', paddingBottom: 90}}>
							<Group>
								{msg_history}
							</Group>
						</Div>
						<FixedLayout vertical="bottom" style={{  color: 'gray', backgroundColor: 'white' }}>
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
							<Header mode="secondary">Главное о приложении</Header>
							<Cell multiline>
								<InfoRow header="GitHub проекта">
									<Link href="https://github.com/tageerBOY">Ссылка</Link>
								</InfoRow>
								<br></br>
								<InfoRow header="Пользованием приложением">
									Используя данное приложение, вы соглашаетесь c Политикой конфиденциальности, Пользовательским соглашением и правилами пользования приложения. 
								</InfoRow>
								<br></br>
								<InfoRow header="Лицензия">
									MIT
								</InfoRow>
							</Cell>
						</Group>
						<Group>
							<Header mode="secondary">Помощь в разработке</Header>
							<Cell multiline>
								<InfoRow header="Связаться с автором">
									Мой Email: kitaev.tagir@gmail.com
								</InfoRow>
								<br></br>
								<InfoRow header="Помочь материально">
									Мой QIWI:
								</InfoRow>
							</Cell>
						</Group>
						<Group>
							<Header mode="secondary">Документы</Header>
							<Cell multiline>
								<InfoRow header="Пользовательское соглашение">
									<Link href="https://vk.com/dev/uterms">Типовое пользовательское соглашение</Link>
								</InfoRow>
								<br></br>
								<InfoRow header="Политика конфиденциальности">
									<Link href="https://vk.com/dev/uprivacy">Типовая политика конфиденциальности</Link>
								</InfoRow>
								<br></br>
								<InfoRow header="Правила пользования">
									<Link onClick={() => this.setState({ activeView: 'app-rules' })}>Перейти</Link>
								</InfoRow>
							</Cell>
						</Group>
					</Panel>
				</View>
				<View id="app-rules" activePanel="panel3">
					<Panel id="panel3">
						<PanelHeader left={<PanelHeaderBack onClick={() => this.setState({ activeView: 'view2' }) }></PanelHeaderBack>}>
							Правила
						</PanelHeader>
						<Group>
							<Header mode="secondary">1. Запрещается(-ются)</Header>
							<Cell multiline>
								<InfoRow header="1.1 Контент Сообщений">
									1.1.1 Принижение человеческого достоинства (наказание: 1 раз — предупреждение, 2 раз — блокировка доступа к приложению)
									<br></br>
									1.1.2 Спам сообщений, флуд (наказание: блокировка доступа к приложению)
									<br></br>
									1.1.3 Сообщения, содержащие в себе ссылки на иные ресурсы, отличные от https://vk.com и официального сайта приложения (наказание: блокировка доступа к приложению)
									<br></br>
									1.1.4 Сообщения, содержащие в себе материал порнографического, экстремистского характера (наказание: блокировка доступа к приложению)
									<br></br>
									1.1.5 Сообщения, в которых автор разжигает межнациональную рознь, оскорбляет личность по расовой, этнической, сексуальной принадлежности (наказание: 1 раз — предупреждение, 2 раз — блокировка доступа к приложению)
									<br></br>
									1.1.6 Сообщения, в которых автор призывает иных личностей к неправомерным действиям, нарушающим Законы Российской Федерации, Правила Пользования социальной сети «ВКонтакте», Правила Пользования данного приложения (наказание: блокировка доступа к приложению)
									<br></br>
									1.1.7 Сообщения, в которых автор призывает иных личностей к суициду или провоцируют к иным подобным действиям (наказание: 1 раз — предупреждение, 2 раз — блокировка доступа к приложению)
									<br></br>
									1.1.8 Оскорбление администраторов данного приложения или администрации социальной сети «ВКонтакте» (наказание: блокировка доступа к приложению)
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