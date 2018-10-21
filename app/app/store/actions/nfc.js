export const NfcTypes = {
    NFC_TAG_SCANNED:      'NFC/NFC_TAG_SCANNED',
    NFC_SCAN_TAG:         'NFC/SCAN_TAG',
    NFC_SCAN_TAG_FAILURE: 'NFC/SCAN_TAG_FAILURE',
};

const nfcTagScanned = ({ tag }) => (
    {
        type: NfcTypes.NFC_TAG_SCANNED,
        tag
    }
);

const scanTag = () => (
    {
        type: NfcTypes.NFC_SCAN_TAG,
    }
);

const scanTagFailure = () => (
    {
        type: NfcTypes.NFC_SCAN_TAG_FAILURE,
    }
);

export const NfcActions = {
    scanTag,
    nfcTagScanned,
    scanTagFailure
};