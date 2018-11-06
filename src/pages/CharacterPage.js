

class CharacterPage extends React.Component {
    render() {
        return (
            <div>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.valuePaperLeft}
                    onChangeIndex={this.handleChangeIndexPaperLeft}
                >
                    <TabContainer dir={theme.direction}>
                        <Paper>xs=5</Paper>

                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <Paper>xs=6</Paper>

                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <Paper>xs=7</Paper>

                    </TabContainer>
                </SwipeableViews>
            </div>
        )
    }
}

export default CharacterPage;
