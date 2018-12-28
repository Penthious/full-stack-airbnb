import * as React from "react";
import { PureComponent } from "react";
import { Form, Formik, Field, FormikActions } from "formik";
import { Icon } from "antd";
import { InputField } from "../../shared/InputField";
import { SubmitButton } from "../../shared/SubmitButton";
import {
  withCreateListing,
  WithCreateListingProps,
} from "@airbnb-clone/controller";
import { TagField } from "../../shared/TagField";
import { createListingSchema } from "@airbnb-clone/common";

interface FormValues {
  name: string;
  category: string;
  description: string;
  price: number;
  beds: number;
  guests: number;
  latitude: number;
  longitude: number;
  amenities: string[];
}
export class CreateListingConnector extends PureComponent<
  WithCreateListingProps
> {
  submit = async (
    values: FormValues,
    { setSubmitting }: FormikActions<FormValues>,
  ) => {
    await this.props.createListing(values);
    setSubmitting(false);
  };
  render() {
    return (
      <Formik<FormValues>
        initialValues={{
          name: "",
          category: "",
          description: "",
          price: 0,
          beds: 0,
          guests: 0,
          latitude: 0,
          longitude: 0,
          amenities: [],
        }}
        validationSchema={createListingSchema}
        onSubmit={this.submit}
      >
        {() => (
          <Form style={{ display: "flex" }}>
            <div style={{ width: 400, margin: "auto" }}>
              <Field
                name="name"
                placeholder="Name"
                label="Name"
                prefix={
                  (
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                }
                component={InputField}
              />
              <Field
                name="category"
                placeholder="Category"
                label="Category"
                prefix={
                  (
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                }
                component={InputField}
              />
              <Field
                name="description"
                placeholder="Description"
                label="Description"
                prefix={
                  (
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                }
                component={InputField}
              />
              <Field
                name="price"
                placeholder="Price"
                label="Price"
                prefix={
                  (
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                }
                component={InputField}
                useNumberComponent={true}
              />
              <Field
                name="beds"
                placeholder="Number of beds"
                label="Beds"
                prefix={
                  (
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                }
                component={InputField}
                useNumberComponent={true}
              />
              <Field
                name="guests"
                placeholder="Number of guests"
                label="Guests"
                prefix={
                  (
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                }
                component={InputField}
                useNumberComponent={true}
              />
              <Field
                name="latitude"
                placeholder="Latitude"
                label="Latitude"
                prefix={
                  (
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                }
                component={InputField}
                useNumberComponent={true}
              />
              <Field
                name="longitude"
                placeholder="Longitude"
                label="Longitude"
                prefix={
                  (
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                }
                component={InputField}
                useNumberComponent={true}
              />
              <Field
                name="amenities"
                placeholder="Amenities"
                label="Amenities"
                prefix={
                  (
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  ) as any
                }
                component={TagField}
              />
              <Field
                name="submit"
                type="primary"
                htmlType="submit"
                text="Submit"
                component={SubmitButton}
              />
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

export default withCreateListing(CreateListingConnector);
