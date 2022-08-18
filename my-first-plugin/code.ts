figma.showUI(__html__);

figma.ui.resize(500, 500);

figma.ui.onmessage = async (pluginMessage) => {
  await figma.loadFontAsync({ family: 'Rubik', style: 'Regular' });

  const nodes: SceneNode[] = [];

  const postComponentSet = figma.root.findOne(
    (node) => node.type == 'COMPONENT_SET' && node.name == 'post'
  ) as ComponentSetNode;

  let selectedVariant;

  if (pluginMessage.darkModeState) {
    switch (pluginMessage.imageVariant) {
      case '2':
        selectedVariant = postComponentSet.findOne(
          (node) =>
            node.type == 'COMPONENT' &&
            node.name == 'Image=single, Dark mode=true'
        );
        break;
      case '3':
        selectedVariant = postComponentSet.findOne(
          (node) =>
            node.type == 'COMPONENT' &&
            node.name == 'Image=carousel, Dark mode=true'
        );
        break;
      default:
        selectedVariant = postComponentSet.findOne(
          (node) =>
            node.type == 'COMPONENT' &&
            node.name == 'Image=none, Dark mode=true'
        );
        break;
    }
  } else {
    switch (pluginMessage.imageVariant) {
      case '2':
        selectedVariant = postComponentSet.findOne(
          (node) =>
            node.type == 'COMPONENT' &&
            node.name == 'Image=single, Dark mode=false'
        );
        break;
      case '3':
        selectedVariant = postComponentSet.findOne(
          (node) =>
            node.type == 'COMPONENT' &&
            node.name == 'Image=carousel, Dark mode=false'
        );
        break;
      default:
        selectedVariant = postComponentSet.defaultVariant;
        break;
    }
  }

  const newPost = selectedVariant.createInstance();

  const templateName = newPost.findOne(
    (node) => node.name == 'displayName' && node.type == 'TEXT'
  ) as TextNode;

  const templateUsername = newPost.findOne(
    (node) => node.name == '@username' && node.type == 'TEXT'
  ) as TextNode;

  const templateDescription = newPost.findOne(
    (node) => node.name == 'description' && node.type == 'TEXT'
  ) as TextNode;

  const numLikes = newPost.findOne(
    (node) => node.name == 'likesLabel' && node.type == 'TEXT'
  ) as TextNode;

  const numComments = newPost.findOne(
    (node) => node.name == 'commentsLabel' && node.type == 'TEXT'
  ) as TextNode;

  templateName.characters = pluginMessage.name;
  templateUsername.characters = pluginMessage.username;
  templateDescription.characters = pluginMessage.description;

  numLikes.characters = String(Math.floor(Math.random() * 100));
  numComments.characters = String(Math.floor(Math.random() * 100));

  nodes.push(newPost);

  figma.viewport.scrollAndZoomIntoView(nodes);

  figma.closePlugin();
  // }
};
