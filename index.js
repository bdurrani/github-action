const core = require("@actions/core");
const github = require("@actions/github");

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
  const token = core.getInput("repo-token", { required: true });
  const client = new github.GitHub(token);
  const tags = client.repos.listTags({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
  });
  console.log(tags);
} catch (error) {
  core.setFailed(error.message);
}
