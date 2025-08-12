export default () => {
    const sessionStorageKey = 'my-session-id'
    let sessionId = ''
    const channel = new BroadcastChannel('tab-communication')

    channel.onmessage = (event) => {
        if (event.data.type === 'NEW_TAB_OPENED' && event.data.sessionId === sessionId) {
            window.location.href = 'https://www.google.com'
        }
    }

    if (typeof window !== 'undefined') {
        sessionId = localStorage.getItem(sessionStorageKey)
        if (!sessionId) {
            sessionId = crypto.randomUUID()
            localStorage.setItem(sessionStorageKey, sessionId)
        }

        channel.postMessage({
            type: 'NEW_TAB_OPENED',
            sessionId
        })
    }
}
