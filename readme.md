### Creating a commit
A commit should contain a list of sections of the site that has been altered and what changed. Using this template:

```
<section name> <version>
<list of changes>
```

#### List
A list should show the what was changed. Using these characters:

| Character | Meaning |
| :-: | :- |
| + | Addition, like a feature of UI element |
| - | Deletion |
| ~ | Change, like behavior or UI layout |
| * | Bug fix |

Example: `~ Changed border color from green to blue`

#### Version system

A version consists of two main parts: the release and change part. All versions should starts with `v` and uses this template: `v<release><change>`.

Example: `va1.6`: Indicates a pre-release with 1 mayor change and 6 minor changes.

Example: `vC4.45`: Indicates a release with 4 mayor changes and 45 minor changes

##### Release

A release is a letter that go's up: A, B, C etc. A capital letter indicates a production ready release and a lower case letter indicates a pre-release.

##### Change

A change is represented by two numbers: the mayor and minor changes, like this `<mayor>.<minor>` and count upwards.

###### Mayor change

A mayor change is a change when user experience and or interaction is altered.

###### Minor change

A minor change is when not a lot changes for the user. Like a color change or button alignment.