import { styled, Tooltip } from '@mui/material'
import { tooltipClasses } from '@mui/material/Tooltip'
import React, { useState } from 'react'

const StyledTooltip = styled(({ className, ...props }: any) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(() => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#1f1f1f',
		color: 'rgb(255, 255, 255)',
		borderRadius: '5px',
		padding: '7px',
		fontSize: '15px',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
		fontWeight: '600',
	},
}))

interface CustomTooltipProps {
	title: string
	children: React.ReactNode
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ title, children }) => {
	const [open, setOpen] = useState(false)

	return (
		<StyledTooltip
			title={title}
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
		>
			<div onClick={() => setOpen(false)}>{children}</div>
		</StyledTooltip>
	)
}

export default CustomTooltip
