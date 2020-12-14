import React from 'react'
import t from 't'
import { ScrollForm, Form } from 'co/form'

import Title from './title'
import Sort from './sort'
import Collapse from './collapse'
import Add from './add'
import Remove from './remove'

function EditGroup({ route: { params={} }, ...etc }) {
	return (
		<ScrollForm>
			<Form>
				<Title {...params} {...etc} />
			</Form>

			<Form>
				<Sort {...params} {...etc} />
				<Collapse {...params} {...etc} />
			</Form>

			<Add {...params} {...etc} />
			<Remove {...params} {...etc} />
		</ScrollForm>
	)
}

EditGroup.options = {
	title: t.s('group'),
	headerStyle: {
		backgroundColor: 'transparent',
		elevation: 0,
		shadowOpacity: 0
	}
}

export default EditGroup