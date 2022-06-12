import { OptionModel } from '../models/option.model';
import { Sort, SORT_TYPES } from '../models/query.models';

export const sortOptions: OptionModel<Sort>[] = [
  {
    label: 'Best match',
    value: {
      direction: 'desc',
      property: SORT_TYPES.bestMatch
    }
  },
  {
    label: 'Most stars',
    value: {
      direction: 'desc',
      property: SORT_TYPES.stars
    }
  },
  {
    label: 'Fewest stars',
    value: {
      direction: 'asc',
      property: SORT_TYPES.stars
    }
  },
  {
    label: 'Most forks',
    value: {
      direction: 'desc',
      property: SORT_TYPES.forks
    }
  },
  {
    label: 'Fewest forks',
    value: {
      direction: 'asc',
      property: SORT_TYPES.forks
    }
  },
  {
    label: 'Recently updated',
    value: {
      direction: 'desc',
      property: SORT_TYPES.updated
    }
  },
  {
    label: 'Least recently updated',
    value: {
      direction: 'desc',
      property: SORT_TYPES.updated
    }
  }
];
