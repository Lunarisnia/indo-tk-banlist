import os
import re
import sys

body = os.environ["PR_BODY"]

# Extract player name
match = re.search(r"Player name.*?```\s*\n(.+?)\n```", body, re.DOTALL)
if not match:
    print("::error::Could not find player name block in PR description")
    sys.exit(1)

name = match.group(1).strip()
if not name or name == "<name here>":
    print("::error::Player name is empty or still contains placeholder")
    sys.exit(1)

print(f"Player name: {name!r}")

# Extract submitted by
match_by = re.search(r"Submitted By.*?```\s*\n(.+?)\n```", body, re.DOTALL)
if not match_by:
    print("::error::Could not find 'Submitted By' block in PR description")
    sys.exit(1)

submitted_by = match_by.group(1).strip()
if not submitted_by or submitted_by == "<name here>":
    print("::error::'Submitted By' is empty or still contains placeholder")
    sys.exit(1)

print(f"Submitted by: {submitted_by!r}")

# Append to banlist
banlist_path = "public/banlist.txt"
with open(banlist_path, "a") as f:
    f.write(name + "\n")

print(f"Appended {name!r} to {banlist_path}")
