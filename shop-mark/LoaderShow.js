import React from 'react';
import {Card, Grid, Placeholder} from "semantic-ui-react";
import '../../theme/components/show.css';

const LoaderShow = () => {
  return (
    <div className={'ui container loader-show'}>
      <Placeholder fluid>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
      <br />
      <br/>
      <Placeholder fluid>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
      <div className={'margin-top-card'}>
        <Grid stackable columns={2}>
          <Grid.Row centered>
            <Grid.Column className={'w-100-p'} width={5}>
              <Card className={'shadow'} centered>
                <Card.Content extra>
                  <Placeholder fluid>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </Placeholder>
                  <Placeholder fluid>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </Placeholder>
                  <Placeholder fluid>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </Placeholder>
                  <Placeholder fluid>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column className={'w-100-p'} width={11}>
              <Card className={'shadow'} centered>
                <Card.Content extra>
                  <Placeholder fluid>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </Placeholder>
                  <Placeholder fluid>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </Placeholder>
                  <Placeholder fluid>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </Placeholder>
                  <Placeholder fluid>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

    </div>
  );
};

export default LoaderShow;
