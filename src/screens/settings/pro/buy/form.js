import React from 'react'
import {Image} from 'react-native'
import {mediumFade} from 'co/style/animation'
import {
	Wrap,
	Loading,
	Periods
} from './style'
import Goto from 'co/common/goto'
import {
	Form,
	SubInfoText
} from 'co/style/form'

const icon_pro = <Image source={require('assets/images/pro.png')} />

export default class ProBuy extends React.PureComponent {
	componentWillReceiveProps(nextProps) {
		//animation
		if (nextProps.loading != this.props.loading)
			mediumFade();
	}

	renderPeriods = ()=>{
		return (
			<Periods>
				<Form>
					{this.props.periods.map(({id, title, price})=>(
						<Goto 
							key={id}
							label={(this.props.isPro?'+ ':'')+title}
							iconComponent={icon_pro}
							subLabel={price}
							onPress={()=>this.props.onSelect(id)} />
					))}
				</Form>

				<SubInfoText>No complicated tiers and recurring payments. You will get access to all features in all supported platforms (Web, macOS, Windows, iOS, Android) for the selected period of time.</SubInfoText>
				<SubInfoText>All content you made in PRO remains available in free when plan is ended.</SubInfoText>
			</Periods>
		)
	}

	render() {
		return (
			<Wrap>
				{this.props.loading ? <Loading /> : this.renderPeriods()}
			</Wrap>
		)
	}
}