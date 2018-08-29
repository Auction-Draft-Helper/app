# Fantasy Auction Wizard

Welcome to Fantasy Auction Wizard!  This is an application to be used alongside fantasy auctions which tells the user the maximum they should bid on a given player given everything that has happened in the draft.

## Data Sourcing

The data for Fantasy Auction Wizard is aggregated in another application running locally on my machine in order to limit the size of FAW.  Data is updated every few days during draft season or whenever an event (injury, suspension, etc.) occurs.

If you wish to update the data yourself, you'll need to include all of the fields on the player object except catches, which is used to pre-calculate projected fantasy points when the json file is made.

## Model

The model used for FAW (created in model.js) is based on this linear programming node module: https://www.npmjs.com/package/javascript-lp-solver

In order to adjust the model for your league's settings, go into the model.js file and edit the appropriate field's values based on the documentation in the LP module.
