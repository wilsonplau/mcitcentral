import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Link,
  Typography,
  Button,
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import LinkIcon from "@material-ui/icons/Link";

const useStyles = makeStyles({
  table: {
    backgroundColor: "white",
  },
  tableRow: {
    cursor: "pointer",
  },
  tableContainer: {
    overflow: "scroll",
  },
});

interface ElectiveTableProps {
  uid: string;
  electiveSuggestions: ElectiveSuggestionList;
  handleVote: (electiveId: string, vote: boolean) => Promise<void>;
}

const ElectiveTable: React.FC<ElectiveTableProps> = ({ uid, electiveSuggestions, handleVote }) => {
  const classes = useStyles();

  const sortedElectiveArray = Object.values(electiveSuggestions)
    .map((elective: ElectiveSuggestion) => {
      const voteTotal = Object.values(elective.votes).reduce((acc, val) => {
        if (val) return acc + 1;
        else return acc;
      }, 0);
      return {
        ...elective,
        voteTotal,
      };
    })
    .sort(({ voteTotal: a }, { voteTotal: b }) => b - a);

  return (
    <Box className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: 80, width: 80 }}>ID</TableCell>
            <TableCell style={{ minWidth: 250 }}>Name</TableCell>
            <TableCell align="center" style={{ width: 50 }}>
              Link
            </TableCell>
            <TableCell align="center" style={{ width: 50 }}>
              Total
            </TableCell>
            <TableCell align="center" style={{ width: 100 }}>
              Vote
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedElectiveArray.map(({ id, name, link, votes, voteTotal }) => {
            return (
              <TableRow hover key={id} className={classes.tableRow}>
                <TableCell>{id}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell align="center">
                  {link ? (
                    <Link href={link} target="_blank" rel="noreferrer">
                      <LinkIcon />
                    </Link>
                  ) : (
                    <LinkIcon color="disabled" />
                  )}
                </TableCell>
                <TableCell align="center">{voteTotal}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color={votes[uid] ? "primary" : "default"}
                    onClick={() => handleVote(id, !votes[uid])}
                  >
                    <ArrowDropUpIcon />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
          {Object.keys(electiveSuggestions).length === 0 && (
            <TableRow>
              <TableCell colSpan={6}>
                <Typography>No courses found</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ElectiveTable;
