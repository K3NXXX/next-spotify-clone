import { create } from 'zustand'

const useStore = create(set => ({
	bears: 0,
	showTooltip: true,
	setShowTooltip: (newState: boolean) =>
		set((state: boolean) => ({ showTooltip: newState })),
}))
export default useStore
