import React from 'react'
import t from 't'
import {mediumFade} from 'co/style/animation'
import { ActivityIndicator } from 'co/native'
import {
	Wrap,
	Periods
} from './style'
import Goto from 'co/common/goto'
import {
	Form,
	SubInfoText
} from 'co/style/form'

export default class ProBuy extends React.PureComponent {
	componentDidUpdate(prevProps) {
		//animation
		if (prevProps.loading != this.props.loading)
			mediumFade();
	}

	renderPeriods = ()=>{
		return (
			<Periods>
				<Form>
					{this.props.periods.map(({productId, localizedTitle, localizedPrice}, index)=>
						this.props.active == productId ?
							<Goto 
								key={productId}
								last={index == this.props.periods.length-1}
								label={localizedTitle}
								icon='checkbox-circle'
								subLabel={localizedPrice}
								action='' /> :
							<Goto 
								key={productId}
								last={index == this.props.periods.length-1}
								label={localizedTitle}
								icon='vip-diamond'
								subLabel={localizedPrice}
								onPress={()=>this.props.onSelect(productId)} />
					)}
				</Form>

				<Form>
					<Goto 
						last
						label={t.s('restore')}
						onPress={this.props.onRestore} />
				</Form>

				<SubInfoText>Auto-renewable. You will get access to all features in all supported platforms (Web, macOS, Windows, iOS, Android).</SubInfoText>
				<SubInfoText>All content you made in PRO remains available in free when subscription is canceled.</SubInfoText>
			</Periods>
		)
	}

	render() {
		return (
			<Wrap>
				{this.props.loading ? <ActivityIndicator /> : this.renderPeriods()}
			</Wrap>
		)
	}
}