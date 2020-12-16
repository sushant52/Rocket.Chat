import React, { useEffect, useState } from 'react';
import {
	Option,
	ActionButton,
	Menu,
} from '@rocket.chat/fuselage';
import { useUniqueId } from '@rocket.chat/fuselage-hooks';


import { useUserInfoActions, useUserInfoActionsSpread } from '../../../../hooks/useUserInfoActions';
import UserAvatar from '../../../../../../components/avatar/UserAvatar';
import { ReactiveUserStatus } from '../../../../../../components/UserStatus';
import { usePreventProgation } from '../hooks/usePreventProgation';

const UserActions = ({ username, _id, rid }) => {
	const { menu: menuOptions } = useUserInfoActionsSpread(useUserInfoActions({ _id, username }, rid));
	const id = useUniqueId();

	const [showButton, setShowButton] = useState();

	useEffect(() => {
		showButton && document.getElementById(`a-${ id }`).click();
	}, [id, showButton]);

	const onClick = usePreventProgation(() => {
		setShowButton(true);
	});

	if (!menuOptions) {
		return null;
	}
	return (
		<Option.Menu onClick={onClick}>
			{!showButton ? <ActionButton
				ghost
				tiny
				icon='kebab'
			/> : <Menu
				id={`a-${ id }`}
				flexShrink={0}
				key='menu'
				tiny
				renderItem={({ label: { label, icon }, ...props }) => <Option {...props} label={label} icon={icon} />}
				options={menuOptions}
			/>}
		</Option.Menu>
	);
};

export const MemberItem = ({ _id, status, name, username, onClickView, style, rid }) =>
	<Option
		id={_id}
		style={style}
		data-username={username}
		presence={status}
		onClick={onClickView}
	>
		<Option.Avatar>
			<UserAvatar username={username} size='x28' />
		</Option.Avatar>
		<Option.Column><ReactiveUserStatus uid={_id} presence={status}/></Option.Column>
		<Option.Content>{name} <Option.Description>({username})</Option.Description></Option.Content>
		<UserActions username={username} rid={rid} _id={_id} />
	</Option>;

MemberItem.Skeleton = Option.Skeleton;
