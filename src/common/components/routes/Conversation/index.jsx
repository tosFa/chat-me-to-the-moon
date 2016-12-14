import React from 'react';
import { graphql } from 'react-apollo';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';
import DropZone from '../../elements/DropZone';
import styles from './styles.css';
import { upload } from '../../../redux/actions';
import { CONVERSATION_DATA_QUERY, CONVERSATION_MUTATION_QUERY, CONVERSATION_SUBSCRIPTION_QUERY}
  from '../../../../client/graphql/conversations';
import Container from '../../layout/Container';

const FileInput = ({ onDrop }) => <DropZone onDrop={onDrop} />;

const selector = formValueSelector('chat');

const mapStateToProps = state => ({
  files: selector(state, 'files'),
  message: selector(state, 'message'),
  conversationData: state.conversations
});

const mapDispatchToProps = (dispatch) => ({
  uploadFile: (files) => dispatch(upload(files))
});

@reduxForm({ form: 'chat', initialValues: { files: [], message: '' }, onSubmit: () => {} })
@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
export class Conversation extends React.Component {
  static defaultProps = {
    files: [],
    message: ''
  }
  constructor(props) {
    super(props);

    this.handleSubmit = ::this.handleSubmit;
    this.onDrop = ::this.onDrop;
    this.resetMessage = ::this.resetMessage;

    this.state = { messages: [] };

    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    // we don't resubscribe on changed props, because it never happens in our app
    if (!this.subscription && !nextProps.loading) {
      this.setState({ messages: nextProps.conversation.messages });

      this.subscription = this.props.subscribeToMore({
        document: CONVERSATION_SUBSCRIPTION_QUERY,
        variables: { conversationId: Number(nextProps.params.id) },
        updateQuery: (previousResult, { subscriptionData }) => {
          const message = subscriptionData.data.messageAdded;
          // if it's our own mutation, we might get the subscription result
          // after the mutation result.
          this.setState({ messages: [ ...this.state.messages, message ] });

        },
      });
    }
  }

  handleSubmit() {
    const { sendMessage, message, files, uploadFile, params: { id } } = this.props;

    let data = {
      id: 100,
      authorId: 1,
      conversationId: id,
      text: message,
    };

    if (files.length) {
      uploadFile(files)
        .then(() => {
          const { conversationData: { filenames } } = this.props;

          sendMessage({...data, files: filenames.map(item => item.path)})
        })
        .then(() => this.resetMessage());
    } else {
      sendMessage(data)
        .then(() => this.resetMessage());
    }

  }

  resetMessage() {
    const { change } = this.props;

    change('message', '');
    change('files', [])
  }

  onDrop(files) {
    this.props.change('files', files);
  }

  renderFiles(files) {
    return (
      <ul>
        {files.map((item, index) => <li key={index}><img src={`/${item}`}/></li>)}
      </ul>
    );
  }

  render() {
    const { files } = this.props;
    const { messages } = this.state;
    return (
      <Container>
        <div styleName="block">
          <h1>Conversations</h1>
          <ul styleName="messages">
            {messages.map(
              (message, index) =>
                <li styleName="message" key={index}>
                  {message.text}
                  {message.files ? this.renderFiles(message.files) : null}
                </li>
            )}
          </ul>

          <form>
            <Field component="textarea" name="message"/>
            <Field name="files" component={FileInput} onDrop={this.onDrop}/>

          </form>
          <ul styleName="files">
            {files.map(
              (file, index) =>
                <li styleName="file" key={index}>
                  <img src={file.preview} styleName="img"/>
                </li>
            )}
          </ul>

          <button onClick={this.handleSubmit}>Send</button>
        </div>
      </Container>
    );
  }
}


const withData = graphql(CONVERSATION_DATA_QUERY, {
  options: ({ params }) => {
    return {
      variables: { conversationId: params.id }
    };
  },
  props: ({ data: { loading, subscribeToMore, conversation }, ownProps: { params: id } }) => {
    return {
      loading, subscribeToMore, conversationId: Number(id), conversation
    }
  },
});

const withMutation = graphql(CONVERSATION_MUTATION_QUERY, {
  props: ({ ownProps, mutate }) => ({
    sendMessage: ({ id, authorId, conversationId, text, files }) => {
      return mutate({
        variables: { id, authorId, conversationId, text, files },
        //optimisticResponse: {
        //  __typename: 'Mutation',
        //  submitComment: {
        //    __typename: 'Message',
        //    id: null,
        //    postedBy: ownProps.currentUser,
        //    createdAt: +new Date(),
        //    content: commentContent,
        //  },
        //}
      })
    }

  })
});

export default withData(withMutation(Conversation));