import React, {Component,renderToString} from 'react'
import {Document, Page, setOptions} from 'react-pdf/dist/entry.noworker';
// import {PdfViewer, setPdfViewerOptions} from '@gemshelf/react-components/lib';
import {range} from 'lodash';

// setPdfViewerOptions({disableWorker: true});
setOptions({
    disableWorker: true
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numPages: null,
            pageNumber: 1,
            rotate: 0,
            manualWidth: null,
            loadedPages: 0,
            renderedPages: 0,
            pageLimit: 5,
            startPage: 1,
            allLoaded: false,
            isFullscreen: false,
            fileTitle: false,
            visibleWidth: 0
        };
    }

    onDocumentLoad(params) {
        const {numPages} = params;

        this.setState({
            numPages,
        });
    }

    renderPage(page) {
        const {loadedPages, renderedPages} = this.state;
        return (
            <Page
                renderMode={'svg'}
                key={`page_${page}`}
                pageNumber={page}
                loading={' '}
                onLoadSuccess={() => this.setState({loadedPages: loadedPages + 1})}
                onRenderSuccess={() => this.setState({renderedPages: renderedPages + 1})}
                renderAnnotations={false}
            />
        );
    }
    createRangeOfPages(from = 1, to) {
        return range(from, to + 1).map(page => ({page}));
    }
    render() {
        const {numPages, pageLimit, startPage} = this.state;
        return (
            <div>
                {/*<PdfViewer fileLocation={'/pdf.pdf'} />*/}
                <Document
                    file={'http://www.pdf995.com/samples/pdf.pdf'}
                    onLoadSuccess={params => this.onDocumentLoad(params)}
                >
                    {this.createRangeOfPages(startPage, pageLimit > numPages ? numPages : pageLimit).map(
                        ({page}) => this.renderPage(page)
                    )}
                </Document>
            </div>
        )
    }
}

