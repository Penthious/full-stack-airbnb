import * as React from "react";
import { PureComponent } from "react";
import { Card } from "antd";
import {
  withFindListings,
  WithFindListingsProps,
} from "@airbnb-clone/controller";

export class FindListingsConnector extends PureComponent<
  WithFindListingsProps
> {
  render() {
    const { listings, loading } = this.props;

    return (
      <div>
        {loading && <div>...loading</div>}
        {listings.map(listing => (
          <Card
            key={`${listing.id}-card`}
            hoverable={true}
            style={{ width: 240 }}
            cover={
              listing.pictureUrl && <img alt="venue" src={listing.pictureUrl} />
            }
          >
            <Card.Meta title={listing.name} description={listing.owner.email} />
          </Card>
        ))}
      </div>
    );
  }
}

export default withFindListings(FindListingsConnector);
