async function copyToClipboard(copyText, element) {
    try {
        await navigator.clipboard.writeText(copyText)
        console.log('Content copied to clipboard')
        var tooltip = element.children[0]
        tooltip.innerHTML = 'Copied: ' + copyText
    } catch (err) {
        console.error('Failed to copy: ', err)
    }
    setTimeout(() => {
        element.blur()
    }, 50)
}

function tooltipLeave(element) {
    var tooltip = element.children[0]
    tooltip.innerHTML = 'Copy to clipboard'
}
