class MyClipboard {

    static copy(value: string) {
        if (navigator && navigator.clipboard) {
            navigator.clipboard
                .writeText(value)
                .then(() => {})
                .catch(() => {
                    this.legacyCopy(value);
                })
        } else {
            this.legacyCopy(value);
        }
    }

    static legacyCopy(value: string) {
        const temp = document.createElement('textarea');
        temp.setAttribute('style', 'display: none;');
        document.body.appendChild(temp);
        temp.value = value;
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
    }
}

export default MyClipboard;
