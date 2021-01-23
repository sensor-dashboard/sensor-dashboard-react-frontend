import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import TopBar from "components/TopBar";
import { TopicContext } from "context/TopicContext";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useFormik } from "formik";
import WYSIGEditor from "pages/forum/components/WYSIGEditor";
import { getTopicListRoute } from "pages/forum/ForumRoutes";
import React, { useContext, useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { RouteComponentProps, withRouter } from "react-router";
import TopicService from "services/TopicService";
import ColorsEnum from "types/ColorsEnum";
import Topic from "types/Topic";

const styles = (theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(30),
      topic: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: ColorsEnum.BGLIGHT,
      padding: "30px",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    actionButton: {
      margin: theme.spacing(3, 0, 2),
      padding: theme.spacing(6, 0, 6),
      backgroundColor: ColorsEnum.OLIVE,
      color: ColorsEnum.WHITE,
    },
  });

const AddTopicPage: React.FunctionComponent<
  WithStyles<typeof styles> &
    RouteComponentProps<{ id: string; topicId: string }>
> = (props) => {
  const {
    classes,
    history,
    match: { params },
  } = props;

  const [topic, setTopic] = useState(
    () => new Topic({ categoryId: params.id })
  );
  const { addTopic, updateTopic } = useContext(TopicContext);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const submitForm = async (values: Topic, { setStatus }) => {
    try {
      let newTopic;
      if (isEdit()) {
        newTopic = await updateTopic(topic.id, values);
      } else {
        newTopic = await addTopic(values);
      }

      if (newTopic) {
        history.push(getTopicListRoute(parseInt(params.id)));
      }
    } catch (e) {
      setStatus(e);
    }
  };

  const formik = useFormik<Topic>({
    initialValues: topic,
    onSubmit: submitForm,
    enableReinitialize: true,
  });

  const onEditorStateChange = (change: EditorState) => {
    setEditorState(change);
    formik.setFieldValue(
      "description",
      convertToRaw(change.getCurrentContent())
    );
  };

  const isEdit = () => {
    return !!params.topicId;
  };

  useEffect(() => {
    const setData = async () => {
      if (isEdit()) {
        const s = await TopicService.getTopic(parseInt(params.topicId));
        setTopic(s);
        setEditorState(
          EditorState.createWithContent(convertFromRaw(s.description))
        );
      }
    };
    setData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <TopBar
        alignItems="center"
        backEnabled
        backTo={getTopicListRoute(parseInt(params.id))}
        color={ColorsEnum.OLIVE}
      >
        <Typography component="h1" variant="h4">
          {isEdit() ? "Edit" : "Add"} topic
        </Typography>
      </TopBar>
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <>
            <form
              className={classes.form}
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <TextField
                id="name"
                variant="outlined"
                margin="normal"
                label="Name"
                name="name"
                value={formik.values.name}
                autoFocus
                onChange={formik.handleChange}
                error={!!formik.status?.name}
                helperText={formik.status?.name}
                fullWidth
              />
              <WYSIGEditor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: "20px", minWidth: "200px" }}
                className={classes.actionButton}
              >
                Submit
              </Button>
            </form>
          </>
        </div>
      </Container>
    </>
  );
};

export default withRouter(withStyles(styles)(AddTopicPage));
