class Example extends React.Component {
    render() {
        const { headers, rows } = this.props

        return (
            <Responsive
                query={{
                    small: { maxWidth: '40rem' },
                    large: { minWidth: '41rem' },
                }}
                props={{
                    small: { layout: 'stacked' },
                    large: { layout: 'fixed' },
                }}
            >
                {({ layout }) => (
                    <div>
                        <Table
                            caption='Top rated movies'
                            layout={layout}
                        >
                            <Table.Head>
                                <Table.Row>
                                    {(headers || []).map(({ id, text, width, textAlign }) => (
                                        <Table.ColHeader
                                            key={id}
                                            id={id}
                                            width={width}
                                            textAlign={textAlign}
                                        >
                                            {text}
                                        </Table.ColHeader>
                                    ))}
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                {rows.map((row) => (
                                    <Table.Row key={row.id}>
                                        {headers.map(({ id, renderCell, textAlign }) => (
                                            <Table.Cell
                                                key={id}
                                                textAlign={layout === 'stacked' ? 'start' : textAlign}
                                            >
                                                {renderCell ? renderCell(row[id], layout) : row[id]}
                                            </Table.Cell>
                                        ))}
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                )}
            </Responsive>
        )
    }
}

const renderSummary = (summary, layout) => (layout === 'stacked')
    ? summary
    : (
        <TruncateText
            truncate="word"
            ellipsis="..."
        >
            {summary}
        </TruncateText>
    )

render(
    <Example
        headers={[
            {
                id: 'Title',
                text: 'Title',
                width: '25%',
                textAlign: 'start',
            },
            {
                id: 'Year',
                text: 'Year',
                width: '15%',
                textAlign: 'start',
            },
            {
                id: 'Summary',
                text: 'Summary',
                width: '40%',
                renderCell: renderSummary,
                textAlign: 'start',
            },
            {
                id: 'BoxOffice',
                text: 'Box Office',
                width: '20%',
                textAlign: 'end',
            },
        ]}
        rows={[
            {
                id: '1',
                Title: 'The Shawshank Redemption',
                Year: 1994,
                Summary: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
                BoxOffice: '$28,341,469',
            },
            {
                id: '2',
                Title: 'The Godfather',
                Year: 1972,
                Summary: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
                BoxOffice: '$133,698,921',
            },
            {
                id: '3',
                Title: 'The Godfather: Part II',
                Year: 1974,
                Summary: 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
                BoxOffice: '$47,542,841',
            },
        ]}
    />
)